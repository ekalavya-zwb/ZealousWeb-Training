const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PORT } = require("./config/config");
const con = require("./db");
const sendEmail = require("./services/emailService");
const logger = require("./config/libs/logger");
const upload = require("./config/libs/multer");
// const job = require("./config/libs/job");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/libs/swagger");
const { limiter } = require("./config/libs/limiter");
const { loginLimiter } = require("./config/libs/limiter");
const redisClient = require("./config/libs/redisClient");

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger UI route
// app.use(limiter); // Apply rate limiting to all requests

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to my Express application!" });
});

app.get("/api/orders", async (req, res) => {
  const cachedOrders = await redisClient.get("orders");

  if (cachedOrders) {
    logger.info("Fetched orders from cache");
    return res.status(200).json(JSON.parse(cachedOrders));
  }

  try {
    const [result] = await con.query(
      `SELECT o.order_id, o.customer_name, w.warehouse_name, o.order_date, o.status, SUM(oi.quantity * oi.price) as total_amount
       FROM orders o
       JOIN warehouses w ON o.warehouse_id = w.warehouse_id
       JOIN order_items oi ON oi.order_id = o.order_id
       GROUP BY o.order_id, o.customer_name, w.warehouse_name, o.order_date, o.status
       ORDER BY o.order_id ASC`,
    );

    res.status(200).json(result);
    await redisClient.set("orders", JSON.stringify(result));
    logger.info("Fetched all orders successfully");
  } catch (error) {
    logger.error(`GET /api/orders ${error}`);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// app.get("/api/orders", async (req, res) => {
//   try {
//     const [result] = await con.query(
//       `SELECT o.order_id, o.customer_name, w.warehouse_name, o.order_date, o.status, SUM(oi.quantity * oi.price) as total_amount
//        FROM orders o
//        JOIN warehouses w ON o.warehouse_id = w.warehouse_id
//        JOIN order_items oi ON oi.order_id = o.order_id
//        GROUP BY o.order_id, o.customer_name, w.warehouse_name, o.order_date, o.status
//        ORDER BY o.order_id ASC`,
//     );

//     res.status(200).json(result);
//     logger.info("Fetched all orders successfully");
//   } catch (error) {
//     logger.error(`GET /api/orders ${error}`);
//     res.status(500).json({ message: "Failed to fetch orders" });
//   }
// });

app.get("/api/orders/:id", async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid order ID" });
  }

  try {
    const [result] = await con.query(
      `SELECT o.order_id, o.customer_name, w.warehouse_name, o.order_date, o.status, SUM(oi.quantity * oi.price) as total_amount
       FROM orders o
       JOIN warehouses w ON o.warehouse_id = w.warehouse_id
       JOIN order_items oi ON oi.order_id = o.order_id
       WHERE o.order_id = ?
       GROUP BY o.order_id, o.customer_name, w.warehouse_name, o.order_date, o.status
       ORDER BY o.order_id ASC`,
      [id],
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Order does not exist" });
    }

    res.status(200).json(result[0]);
  } catch (error) {
    console.error(`GET /api/orders/${id} ${error}`);
    res.status(500).json({ message: "Failed to fetch order" });
  }
});

app.post("/api/orders", async (req, res) => {
  const { warehouse_id, customer_name, items } = req.body;

  const connection = await con.getConnection();

  try {
    await connection.beginTransaction();

    const [rows] = await connection.query(
      `SELECT COUNT(*) AS count FROM warehouses WHERE warehouse_id = ?`,
      [warehouse_id],
    );

    if (rows[0].count === 0) {
      throw new Error("Warehouse does not exist");
    }

    const [result] = await connection.query(
      `INSERT INTO orders (customer_name, order_date, warehouse_id, status) 
       VALUES (?, NOW(), ?, "PLACED")`,
      [customer_name, warehouse_id],
    );

    const order_id = result.insertId;

    for (const item of items) {
      await connection.query(`CALL order_placement (?, ?, ?, ?)`, [
        order_id,
        warehouse_id,
        item.product_id,
        item.quantity,
      ]);
    }

    await connection.commit();

    res.status(201).json({ message: "Order placed successfully", order_id });
  } catch (error) {
    await connection.rollback();

    console.error(`POST /api/orders ${error}`);
    res
      .status(500)
      .json({ message: error.message || "Order placement failed" });
  } finally {
    connection.release();
  }
});

app.put("/api/orders/:id/cancel", async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).json({ message: "Invalid order ID" });
  }

  try {
    await con.query(`CALL order_cancellation (?)`, [id]);

    res.status(201).json({ message: "Order cancelled successfully" });
  } catch (error) {
    console.error(`PUT /api/orders/${id}/cancel ${error}`);
    res
      .status(500)
      .json({ message: error.message || "Order cancellation failed" });
  }
});

app.post("/api/login", loginLimiter, async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await con.query(
      `SELECT * FROM employees_auth WHERE email = ?`,
      [email],
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid email" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ empID: user.emp_id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      employee: {
        empId: user.emp_id,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(`POST /api/login ${error}`);
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/send-email", async (req, res) => {
  const { from, to, subject, text } = req.body;

  try {
    await sendEmail(from, to, subject, text);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(`POST /api/send-email ${error}`);
    res.status(500).json({ message: "Failed to send email" });
  }
});

// app.post("/api/upload", upload.single("image"), (req, res) => {
//   console.log("File uploaded:", req.file);
//   res.status(200).json({ message: "File uploaded successfully" });
// });

app.post("/api/upload", upload.array("image", 5), (req, res) => {
  console.log("Files uploaded:", req.files);
  res.status(200).json({ message: "Files uploaded successfully" });
});

app.use((req, res) => {
  res.status(404).json({ message: "404 - Page Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

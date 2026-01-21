const express = require("express");
const con = require("./db/db.js");
const app = express();
const PORT = 3000;

app.use(express.json());
app.set("json spaces", 2);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to my express application!",
  });
});

app.get("/api/orders", (req, res) => {
  con.query(
    `SELECT o.order_id, o.customer_name, w.warehouse_name, 
    p.product_name, oi.quantity, SUM(oi.price * oi.quantity) AS total_amount
    FROM ORDERS o 
    JOIN warehouses w ON o.warehouse_id = w.warehouse_id
    JOIN order_items oi ON oi.order_id = o.order_id
    JOIN products p ON p.product_id = oi.product_id
    GROUP BY o.order_id, o.customer_name, w.warehouse_name, p.product_name, oi.quantity`,
    (error, orders) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      res.status(200).json({ orders });
    },
  );
});

app.get("/api/warehouses/:id/stock", (req, res) => {
  const warehouse_id = req.params.id;

  con.query(
    `SELECT p.product_id, p.product_name, ws.quantity FROM products p
    JOIN warehouse_stock ws ON p.product_id = ws.product_id
    WHERE ws.warehouse_id = ?`,
    [warehouse_id],
    (error, products) => {
      if (products.length === 0) {
        return res.status(404).json({ error: "Warehouse does not exist!" });
      }

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      res.status(200).json({ products });
    },
  );
});

app.post("/api/orders", (req, res) => {
  const { warehouse_id, product_id, customer_name, quantity } = req.body;

  const sql = `CALL order_placement (?, ?, ?, ?, @order_id);`;

  const values = [warehouse_id, product_id, customer_name, quantity];

  con.query(sql, values, (error) => {
    if (error) {
      return res.status(400).json({
        error: error.sqlMessage || "Order placement failed!",
      });
    }

    con.query("SELECT @order_id AS order_id", (error, result) => {
      if (error) {
        return res.status(500).json({
          error: "Failed to fetch order id!",
        });
      }

      res.status(201).json({
        message: "Order placed successfully!",
        order_id: result[0].order_id,
      });
    });
  });
});

app.put("/api/orders/:id/cancel", (req, res) => {
  const order_id = req.params.id;

  con.query("CALL order_cancellation (?)", [order_id], (error) => {
    if (error) {
      return res.status(400).json({
        error: error.sqlMessage || "Order cancellation failed!",
      });
    }

    res.status(201).json({ message: "Order cancelled successfully!" });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

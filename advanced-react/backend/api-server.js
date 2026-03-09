const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const con = require("./db");

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the User API",
  });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  try {
    const [rows] = await con.query(
      "SELECT * FROM employees_auth WHERE email = ?",
      [email],
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ empId: user.emp_id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      user: {
        empId: user.emp_id,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(`POST /api/login error:`, error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/employees", async (req, res) => {
  try {
    const [rows] = await con.query("SELECT * FROM employees");
    res.status(200).json(rows);
  } catch (error) {
    console.error(`GET /api/employees error:`, error);
    res.status(500).json({ message: "Failed to retrieve employees" });
  }
});

app.post("/api/employees", async (req, res) => {
  const { first_name, last_name, email, hire_date, salary, dept_id, state } =
    req.body;

  try {
    const [result] = await con.query(
      "INSERT INTO employees (first_name, last_name, email, hire_date, salary, dept_id, state) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [first_name, last_name, email, hire_date, salary, dept_id, state],
    );

    res.status(201).json({
      message: "Employee inserted successfully",
      employee: {
        id: result.insertId,
        firstName: first_name,
        lastName: last_name,
        email,
        hireDate: hire_date,
        salary,
        deptId: dept_id,
        state,
      },
    });
  } catch (error) {
    console.error(`POST /api/employees error:`, error);
    res.status(500).json({ message: "Failed to create employee" });
  }
});

app.put("/api/employees/:id", async (req, res) => {
  const empId = Number(req.params.id);

  if (Number.isNaN(empId)) {
    return res.status(400).json({ message: "Invalid employee ID" });
  }

  const { first_name, last_name, email, hire_date, salary, dept_id, state } =
    req.body;

  try {
    const [result] = await con.query(
      "UPDATE employees SET first_name=?, last_name=?, email=?, hire_date=?, salary=?, dept_id=?, state=? WHERE id=?",
      [first_name, last_name, email, hire_date, salary, dept_id, state, empId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res
      .status(200)
      .json({ message: "Employee updated successfully", id: empId });
  } catch (error) {
    console.error(`PUT /api/employees/${empId} error:`, error);
    res.status(500).json({ message: "Failed to update employee" });
  }
});

app.put("/api/employees/salary/:id", async (req, res) => {
  const empId = Number(req.params.id);

  if (Number.isNaN(empId)) {
    return res.status(400).json({ message: "Invalid employee ID" });
  }

  const { salary } = req.body;

  try {
    const [result] = await con.query(
      "UPDATE employees SET salary=? WHERE id=?",
      [salary, empId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      employee: {
        id: empId,
        salary,
      },
    });
  } catch (error) {
    console.error(`PUT /api/employees/${empId} error:`, error);
    res.status(500).json({ message: "Failed to update employee" });
  }
});

app.delete("/api/employees/:id", async (req, res) => {
  const empId = Number(req.params.id);

  if (Number.isNaN(empId)) {
    return res.status(400).json({ message: "Invalid employee ID" });
  }

  try {
    const [result] = await con.query("DELETE FROM employees WHERE id = ?", [
      empId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res
      .status(200)
      .json({ message: "Employee deleted successfully", id: empId });
  } catch (error) {
    console.error(`DELETE /api/employees/${empId} error:`, error);
    res.status(500).json({ message: "Failed to delete employee" });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: "404 - Page Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

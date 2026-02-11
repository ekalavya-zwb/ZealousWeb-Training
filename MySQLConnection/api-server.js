const express = require("express");
const cors = require("cors");
const con = require("./db");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
app.set("json spaces", 2);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the API",
    employees: "/api/employees",
    departments: "/api/departments",
  });
});

app.get("/api/employees", async (req, res) => {
  try {
    const [rows] = await con.query("SELECT * FROM employees");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/employees/:id", async (req, res) => {
  try {
    const empId = Number(req.params.id);
    if (Number.isNaN(empId)) {
      return res.status(400).json({ message: "Invalid employee ID" });
    }

    const [rows] = await con.query("SELECT * FROM employees WHERE id = ?", [
      empId,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/employees", async (req, res) => {
  try {
    const { first_name, last_name, email, hire_date, salary, dept_id, state } =
      req.body;

    const [result] = await con.query(
      "INSERT INTO employees (first_name, last_name, email, hire_date, salary, dept_id, state) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [first_name, last_name, email, hire_date, salary, dept_id, state],
    );

    res.status(201).json({
      message: "Employee inserted successfully",
      insertId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/employees/:id", async (req, res) => {
  try {
    const empId = Number(req.params.id);
    if (Number.isNaN(empId)) {
      return res.status(400).json({ message: "Invalid employee ID" });
    }

    const { first_name, last_name, email, hire_date, salary, dept_id, state } =
      req.body;

    const [result] = await con.query(
      "UPDATE employees SET first_name=?, last_name=?, email=?, hire_date=?, salary=?, dept_id=?, state=? WHERE id=?",
      [first_name, last_name, email, hire_date, salary, dept_id, state, empId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/employees/:id", async (req, res) => {
  try {
    const empId = Number(req.params.id);
    if (Number.isNaN(empId)) {
      return res.status(400).json({ message: "Invalid employee ID" });
    }

    const [result] = await con.query("DELETE FROM employees WHERE id = ?", [
      empId,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/departments", async (req, res) => {
  try {
    const [rows] = await con.query("SELECT * FROM departments");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/departments/:id", async (req, res) => {
  try {
    const deptId = Number(req.params.id);
    if (Number.isNaN(deptId)) {
      return res.status(400).json({ message: "Invalid department ID" });
    }

    const [rows] = await con.query(
      "SELECT * FROM departments WHERE dept_id = ?",
      [deptId],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/departments", async (req, res) => {
  try {
    const { dept_name, location } = req.body;

    const [result] = await con.query(
      "INSERT INTO departments (dept_name, location) VALUES (?, ?)",
      [dept_name, location],
    );

    res.status(201).json({
      message: "Department inserted successfully",
      insertId: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/api/departments/:id", async (req, res) => {
  try {
    const deptId = Number(req.params.id);
    if (Number.isNaN(deptId)) {
      return res.status(400).json({ message: "Invalid department ID" });
    }

    const { dept_name, location } = req.body;

    const [result] = await con.query(
      "UPDATE departments SET dept_name=?, location=? WHERE dept_id=?",
      [dept_name, location, deptId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.json({ message: "Department updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/departments/:id", async (req, res) => {
  try {
    const deptId = Number(req.params.id);
    if (Number.isNaN(deptId)) {
      return res.status(400).json({ message: "Invalid department ID" });
    }

    const [result] = await con.query(
      "DELETE FROM departments WHERE dept_id = ?",
      [deptId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/dashboard", async (req, res) => {
  try {
    const [empRows] = await con.query(
      "SELECT COUNT(*) AS total FROM employees",
    );

    const [deptRows] = await con.query(
      "SELECT COUNT(*) AS total FROM departments",
    );

    const [salaryRows] = await con.query(
      "SELECT AVG(salary) AS average FROM employees",
    );

    const [onProjectRows] = await con.query(
      "SELECT COUNT(*) AS onProject FROM employees WHERE state = 'ONPROJECT'",
    );

    const [terminatedRows] = await con.query(
      "SELECT COUNT(*) AS fired FROM employees WHERE state = 'TERMINATED'",
    );

    const [activeRows] = await con.query(
      "SELECT COUNT(*) AS active FROM employees WHERE state = 'ACTIVE'",
    );

    const [onBoardedRows] = await con.query(
      "SELECT COUNT(*) AS onBoarded FROM employees WHERE state = 'ONBOARDED'",
    );

    const [totalEngRows] = await con.query(
      "SELECT COUNT(*) AS totalEng FROM employees WHERE dept_id = 1",
    );

    const [totalMarkRows] = await con.query(
      "SELECT COUNT(*) AS totalMark FROM employees WHERE dept_id = 2",
    );

    const [totalSaleRows] = await con.query(
      "SELECT COUNT(*) AS totalSale FROM employees WHERE dept_id = 3",
    );

    const [totalHRRows] = await con.query(
      "SELECT COUNT(*) AS totalHR FROM employees WHERE dept_id = 4",
    );

    const [avgSalEngRows] = await con.query(
      "SELECT AVG(salary) AS avgSalEng FROM employees WHERE dept_id = 1",
    );

    const [avgSalMarkRows] = await con.query(
      "SELECT AVG(salary) AS avgSalMark FROM employees WHERE dept_id = 2",
    );

    const [avgSalSaleRows] = await con.query(
      "SELECT AVG(salary) AS avgSalSale FROM employees WHERE dept_id = 3",
    );

    const [avgSalHRRows] = await con.query(
      "SELECT AVG(salary) AS avgSalHR FROM employees WHERE dept_id = 4",
    );

    res.json({
      totalEmployees: empRows[0].total,
      totalDepartments: deptRows[0].total,
      avgSalary: Math.round(salaryRows[0].average),
      onProject: onProjectRows[0].onProject,
      terminated: terminatedRows[0].fired,
      active: activeRows[0].active,
      onBoarded: onBoardedRows[0].onBoarded,
      totalEng: totalEngRows[0].totalEng,
      totalMark: totalMarkRows[0].totalMark,
      totalSale: totalSaleRows[0].totalSale,
      totalHR: totalHRRows[0].totalHR,
      avgSalEng: Math.round(avgSalEngRows[0].avgSalEng),
      avgSalMark: Math.round(avgSalMarkRows[0].avgSalMark),
      avgSalSale: Math.round(avgSalSaleRows[0].avgSalSale),
      avgSalHR: Math.round(avgSalHRRows[0].avgSalHR || 0),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.use((req, res) => {
  res.status(404).json({ message: "404 - Page Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const con = require("./db");
const app = express();
const PORT = 3000;

app.use(express.json());
app.set("json spaces", 2);
dotenv.config();

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the API",
    employees: "/api/employees",
    departments: "/api/departments",
  });
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

app.get("/api/employees/:id", async (req, res) => {
  const empId = Number(req.params.id);

  if (Number.isNaN(empId)) {
    return res.status(400).json({ message: "Invalid employee ID" });
  }

  try {
    const [rows] = await con.query("SELECT * FROM employees WHERE id = ?", [
      empId,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(`GET /api/employees/${empId} error:`, error);
    res.status(500).json({ message: "Failed to retrieve employee" });
  }
});

app.get("/api/employees/view/:id", async (req, res) => {
  const empId = Number(req.params.id);

  if (Number.isNaN(empId)) {
    return res.status(400).json({ message: "Invalid employee ID" });
  }

  try {
    const [rows] = await con.query(
      `SELECT e.id, e.first_name, e.last_name, e.email, e.hire_date, e.salary, d.dept_name, e.state
      FROM employees e JOIN departments d ON e.dept_id = d.dept_id WHERE id = ?`,
      [empId],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(`GET /api/employees/view/${empId} error:`, error);
    res
      .status(500)
      .json({ message: "Failed to retrieve employee information" });
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
      insertId: result.insertId,
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

    res.status(200).json({ message: "Employee updated successfully" });
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

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error(`DELETE /api/employees/${empId} error:`, error);
    res.status(500).json({ message: "Failed to delete employee" });
  }
});

app.get("/api/departments", async (req, res) => {
  try {
    const [rows] = await con.query("SELECT * FROM departments");
    res.status(200).json(rows);
  } catch (error) {
    console.error("GET /api/departments error:", error);
    res.status(500).json({ message: "Failed to retrieve departments" });
  }
});

app.get("/api/departments/:id", async (req, res) => {
  const deptId = Number(req.params.id);

  if (Number.isNaN(deptId)) {
    return res.status(400).json({ message: "Invalid department ID" });
  }

  try {
    const [rows] = await con.query(
      "SELECT * FROM departments WHERE dept_id = ?",
      [deptId],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(`GET /api/departments/${deptId} error:`, error);
    res.status(500).json({ message: "Failed to retrieve department" });
  }
});

app.post("/api/departments", async (req, res) => {
  const { dept_name, location } = req.body;

  try {
    const [result] = await con.query(
      "INSERT INTO departments (dept_name, location) VALUES (?, ?)",
      [dept_name, location],
    );

    res.status(201).json({
      message: "Department inserted successfully",
      insertId: result.insertId,
    });
  } catch (error) {
    console.error(`POST /api/departments error:`, error);
    res.status(500).json({ message: "Failed to create department" });
  }
});

app.put("/api/departments/:id", async (req, res) => {
  const deptId = Number(req.params.id);

  if (Number.isNaN(deptId)) {
    return res.status(400).json({ message: "Invalid department ID" });
  }

  const { dept_name, location } = req.body;

  try {
    const [result] = await con.query(
      "UPDATE departments SET dept_name=?, location=? WHERE dept_id=?",
      [dept_name, location, deptId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({ message: "Department updated successfully" });
  } catch (error) {
    console.error(`PUT /api/departments/${deptId} error:`, error);
    res.status(500).json({ message: "Failed to update department" });
  }
});

app.delete("/api/departments/:id", async (req, res) => {
  const deptId = Number(req.params.id);

  if (Number.isNaN(deptId)) {
    return res.status(400).json({ message: "Invalid department ID" });
  }

  try {
    const [result] = await con.query(
      "DELETE FROM departments WHERE dept_id = ?",
      [deptId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    console.error(`DELETE /api/departments/${deptId} error:`, error);
    res.status(500).json({ message: "Failed to delete department" });
  }
});

app.post("/api/employees/assign/:id", async (req, res) => {
  const empId = Number(req.params.id);

  if (Number.isNaN(empId)) {
    return res.status(400).json({ message: "Invalid employee ID" });
  }

  const { project_id, hours_worked, role } = req.body;

  let connection;

  try {
    connection = await con.getConnection();
    await connection.beginTransaction();

    const [existing] = await connection.query(
      "SELECT 1 FROM employee_projects WHERE emp_id = ? AND project_id = ?",
      [empId, project_id],
    );

    if (existing.length > 0) {
      await connection.rollback();
      return res.status(400).json({
        message: "Employee is already assigned to this project",
      });
    }

    await connection.query(
      "INSERT INTO employee_projects (emp_id, project_id, hours_worked, role) VALUES (?, ?, ?, ?)",
      [empId, project_id, hours_worked, role],
    );

    const [updateResult] = await connection.query(
      "UPDATE employees SET state = 'ONPROJECT' WHERE id = ?",
      [empId],
    );

    if (updateResult.affectedRows === 0) {
      await connection.rollback();
      return res.status(404).json({ message: "Employee not found" });
    }

    await connection.commit();

    res.status(201).json({
      message: "Employee assigned and state updated successfully",
    });
  } catch (error) {
    if (connection) await connection.rollback();

    console.error(`/api/employees/assign/${empId} error:`, error);
    res.status(500).json({ message: error.message });
  } finally {
    if (connection) connection.release();
  }
});

app.get("/api/projects", async (req, res) => {
  try {
    const [rows] = await con.query("SELECT * FROM projects");
    res.status(200).json(rows);
  } catch (error) {
    console.error(`GET /api/projects error:`, error);
    res.status(500).json({ message: "Failed to retrieve projects" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await con.query(
      "SELECT * FROM employees_auth WHERE email = ?",
      [email],
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ empId: user.emp_id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(201).json({
      employee: {
        empId: user.emp_id,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error(`POST /api/login error:`, error);
    res.status(500).json({ error: error.message });
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

    res.status(200).json({
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

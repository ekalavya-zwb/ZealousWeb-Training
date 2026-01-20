const express = require("express");
const pool = require("./db.js");
const allowRoles = require("./middleware/rbac.js");
const selfAccess = require("./middleware/selfAccess.js");
const app = express();
const PORT = 3000;

app.use(express.json());
app.set("json spaces", 2);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to my express application!",
  });
});

app.post(
  "/api/employees/insert",
  allowRoles("HR", "ADMIN"),
  async (req, res) => {
    const {
      first_name,
      last_name,
      email,
      hire_date,
      salary,
      dept_id,
      manager_id,
    } = req.body;

    try {
      const [result] = await pool.promise().query(
        `INSERT INTO employees (first_name, last_name, email, hire_date, salary, dept_id, manager_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [first_name, last_name, email, hire_date, salary, dept_id, manager_id],
      );

      res.status(201).json({
        message: "Employee created successfully!",
        empId: result.insertId,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
);

app.get(
  "/api/employees/select/:id",
  allowRoles("HR", "ADMIN", "EMPLOYEE"),
  selfAccess,
  async (req, res) => {
    const emp_id = req.params.id;

    try {
      const [employee] = await pool
        .promise()
        .query(`SELECT * FROM employees WHERE id = ?`, [emp_id]);

      if (employee.length === 0) {
        return res.status(404).json({ error: "No employees found!" });
      }

      res
        .status(200)
        .json({ empId: employee[0].id, salary: employee[0].salary });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
);

app.get(
  "/api/employees/selectAll/:id",
  allowRoles("EMPLOYEE", "HR", "ADMIN"),
  selfAccess,
  async (req, res) => {
    const emp_id = req.params.id;

    try {
      const [employee] = await pool
        .promise()
        .query(`SELECT * FROM employees WHERE id = ?`, [emp_id]);

      if (employee.length === 0) {
        return res.status(404).json({ error: "No employees found!" });
      }

      res.status(200).json(employee[0]);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
);

app.delete(
  "/api/employees/delete/:id",
  allowRoles("ADMIN"),
  async (req, res) => {
    const emp_id = req.params.id;

    try {
      const [result] = await pool
        .promise()
        .query(`DELETE FROM employees WHERE id = ?`, [emp_id]);

      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "No employees found!" });
      }

      res.status(200).json({
        message: "Employee deleted successfully!",
        affectedRows: `# of rows affected: ${result.affectedRows}`,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
);

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});

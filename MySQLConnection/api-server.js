const express = require("express");
const cors = require("cors");
const con = require("./db.js");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.set("json spaces", 2);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to my express application!",
    employees: "/api/employees",
    employee: "/api/employees/:id",
  });
});

app.get("/api", (req, res) => {
  res.status(200).json({
    employees: "/api/employees",
    employee: "/api/employees/:id",
  });
});

app.get("/api/employees", (req, res) => {
  con.query("SELECT * FROM employees", (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(result);
  });
});

app.get("/api/departments", (req, res) => {
  con.query("SELECT * FROM departments ", (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(result);
  });
});

app.get("/api/employeesDept", (req, res) => {
  con.query(
    "SELECT e.id, e.first_name, e.last_name, d.dept_name FROM employees e JOIN departments d ON e.dept_id = d.dept_id",
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res.status(200).json(result);
    },
  );
});

app.get("/api/employees/:id", (req, res) => {
  const empId = Number(req.params.id);
  if (Number.isNaN(empId)) {
    return res.status(400).json({ error: "Invalid employee ID!" });
  }

  con.query(
    "SELECT * FROM employees WHERE id = ?",
    [empId],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: "Employee not found!" });
      }
      res.status(200).json(result[0]);
    },
  );
});

app.get("/api/departments/:id", (req, res) => {
  const deptId = Number(req.params.id);
  if (Number.isNaN(deptId)) {
    return res.status(400).json({ error: "Invalid department ID!" });
  }

  con.query(
    "SELECT * FROM departments WHERE dept_id = ?",
    [deptId],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      if (result.length === 0) {
        return res.status(404).json({ error: "Department does not exists!" });
      }
      res.status(200).json(result[0]);
    },
  );
});

app.post("/api/employees", (req, res) => {
  const { first_name, last_name, email, hire_date, salary, dept_id, state } =
    req.body;

  con.query(
    "INSERT INTO employees (first_name, last_name, email, hire_date, salary, dept_id, state) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [first_name, last_name, email, hire_date, salary, dept_id, state],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res
        .status(201)
        .json({ message: "Employee inserted!", insertId: result.insertId });
    },
  );
});

app.post("/api/departments", (req, res) => {
  const { dept_name, location } = req.body;

  con.query(
    "INSERT INTO departments (dept_name, location) VALUES (?, ?)",
    [dept_name, location],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res
        .status(201)
        .json({ message: "Department inserted!", insertId: result.insertId });
    },
  );
});

app.put("/api/employees/:id", (req, res) => {
  const empId = Number(req.params.id);
  if (Number.isNaN(empId)) {
    return res.status(400).json({ error: "Invalid employee ID!" });
  }

  const { first_name, last_name, email, hire_date, salary, dept_id, state } =
    req.body;

  con.query(
    "UPDATE employees SET first_name = ?, last_name = ?, email = ?, hire_date = ?, salary = ?, dept_id = ?, state = ? WHERE id = ?",
    [first_name, last_name, email, hire_date, salary, dept_id, state, empId],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Employee not found!" });
      }
      res.status(200).json({
        message: "Employee updated successfully!",
        affectedRows: `# of rows affected: ${result.affectedRows}`,
      });
    },
  );
});

app.delete("/api/employees/:id", (req, res) => {
  const empId = Number(req.params.id);
  if (Number.isNaN(empId)) {
    return res.status(400).json({ error: "Invalid employee ID!" });
  }

  con.query("DELETE FROM employees WHERE id = ?", [empId], (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found!" });
    }
    res.status(200).json({
      message: "Employee deleted successfully!",
      affectedRows: `# of rows affected: ${result.affectedRows}`,
    });
  });
});

app.delete("/api/departments/:id", (req, res) => {
  const deptId = Number(req.params.id);
  if (Number.isNaN(deptId)) {
    return res.status(400).json({ error: "Invalid department ID!" });
  }

  con.query(
    "DELETE FROM departments WHERE dept_id = ?",
    [deptId],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: "Department does not exist!" });
      }
      res.status(200).json({
        message: "Department removed successfully!",
        affectedRows: `# of rows affected: ${result.affectedRows}`,
      });
    },
  );
});

app.use((req, res) => {
  res.status(404).json({ error: "404 - Page Not Found!" });
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});

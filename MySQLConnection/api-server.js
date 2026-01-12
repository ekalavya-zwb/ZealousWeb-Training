const express = require("express");
const con = require("./db.js");
const app = express();
const PORT = 3000;

app.use(express.json());
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

app.get("/api/employees/:id", (req, res) => {
  const empId = parseInt(req.params.id);

  con.query(
    "SELECT * FROM employees WHERE id = ?",
    [empId],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      if (result.length === 0) {
        return res.status(404).json("Employee not found!");
      }
      res.status(200).json(result[0]);
    }
  );
});

app.post("/api/employees", (req, res) => {
  const {
    first_name,
    last_name,
    email,
    hire_date,
    salary,
    dept_id,
    manager_id,
  } = req.body;

  con.query(
    "INSERT INTO employees (first_name, last_name, email, hire_date, salary, dept_id, manager_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [first_name, last_name, email, hire_date, salary, dept_id, manager_id],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res
        .status(201)
        .json({ message: "Employee inserted!", insertId: result.insertId });
    }
  );
});

// app.get("/api/search", (req, res) => {
//   const name = req.query.name;

//   if (!name) {
//     res.status(400).json({ error: "Please provide a name to search!" });
//   }

//   res.status(200).json({ message: `Searching for: ${name}` });
// });

app.use((req, res) => {
  res.status(404).json({ error: "404 - Page Not Found!" });
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});

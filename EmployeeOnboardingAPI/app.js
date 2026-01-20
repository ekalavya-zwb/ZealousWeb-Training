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

app.post("/api/employees/onboard", (req, res) => {
  const {
    first_name,
    last_name,
    email,
    hire_date,
    salary,
    dept_id,
    manager_id,
    project_id,
    hours_worked,
    role,
  } = req.body;

  const sql = `CALL onboard_employee (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @emp_id);`;

  const values = [
    first_name,
    last_name,
    email,
    hire_date,
    salary,
    dept_id,
    manager_id || null,
    project_id,
    hours_worked,
    role,
  ];

  con.query(sql, values, (error) => {
    if (error) {
      return res.status(400).json({
        error: error.sqlMessage || "Employee onboarding failed",
      });
    }

    con.query("SELECT @emp_id AS employee_id", (error, result) => {
      if (error) {
        return res.status(500).json({
          error: "Failed to fetch employee id",
        });
      }

      res.status(201).json({
        message: "Employee onboarded successfully",
        employee_id: result[0].employee_id,
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

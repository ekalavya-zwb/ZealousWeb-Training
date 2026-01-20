const express = require("express");
const pool = require("./db.js");
const app = express();
const PORT = 3000;

app.use(express.json());
app.set("json spaces", 2);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to my express application!",
  });
});

app.post("/api/departments/:id/increment-salary", async (req, res) => {
  const deptId = req.params.id;
  const { percentage } = req.body;

  try {
    const [employees] = await pool
      .promise()
      .query("SELECT id, salary FROM employees WHERE dept_id = ?", [deptId]);

    if (employees.length === 0) {
      return res.status(404).json({ error: "No employees found!" });
    }

    let updated = 0;
    let totalIncrementAmount = 0;

    for (const employee of employees) {
      const increment = Number(
        ((employee.salary * percentage) / 100).toFixed(2),
      );
      const newSalary = employee.salary + increment;

      totalIncrementAmount += increment;
      updated++;

      await pool
        .promise()
        .query(
          "INSERT INTO salaries_history (emp_id, old_salary, new_salary, change_date) VALUES (?, ?, ?, NOW())",
          [employee.id, employee.salary, newSalary],
        );

      await pool
        .promise()
        .query("UPDATE employees SET salary = ? WHERE id = ?", [
          newSalary,
          employee.id,
        ]);
    }
    res.status(201).json({
      updated: updated,
      total_increment_amount: totalIncrementAmount,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});

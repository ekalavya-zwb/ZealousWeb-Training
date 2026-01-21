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

app.put("/api/employees/terminate/:id", (req, res) => {
  const emp_id = req.params.id;

  con.query(
    "CALL change_employee_state (?, ?)",
    [emp_id, "TERMINATED"],
    (error) => {
      if (error) {
        return res.status(400).json({
          error: error.sqlMessage || "State conversion failed!",
        });
      }

      res.status(201).json({ message: "State changed successfully!" });
    },
  );
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

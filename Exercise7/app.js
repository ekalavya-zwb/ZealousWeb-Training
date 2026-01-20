const express = require("express");
const con = require("./db.js");
const app = express();
const PORT = 3000;

app.use(express.json());
app.set("json spaces", 2);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to my express application!",
  });
});

app.post("/api/projects", (req, res) => {
  const { project_name, start_date, end_date, budget, dept_id } = req.body;

  con.query(
    "SELECT * FROM projects WHERE project_name = ?",
    [project_name],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      if (result.length > 0) {
        return res
          .status(200)
          .json({ message: "Project already exists!", project: result[0] });
      }
      con.query(
        "INSERT INTO projects (project_name, start_date, end_date, budget, dept_id) VALUES (?, ?, ?, ?, ?)",
        [project_name, start_date, end_date, budget, dept_id],
        (error, result) => {
          if (error) {
            return res.status(500).json({ error: error.message });
          }
          res
            .status(201)
            .json({ message: "Project created!", project_id: result.insertId });
        },
      );
    },
  );
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});

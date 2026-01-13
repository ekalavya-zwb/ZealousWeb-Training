const express = require("express");
const con = require("../db/db.js");
const app = express();
const PORT = 3000;

app.use(express.json());
app.set("json spaces", 2);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to my express application!" });
});

app.use((req, res) => {
  res.status(404).json({ error: "404 - Page Not Found!" });
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});

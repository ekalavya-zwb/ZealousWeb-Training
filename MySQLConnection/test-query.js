const con = require("./db.js");

con.query("SELECT * FROM employees", (error, result) => {
  if (error) {
    console.error("Error:", error.message);
    return;
  }
  console.log("employees:", result);
});

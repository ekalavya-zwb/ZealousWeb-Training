const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

con.connect((error) => {
  if (error) {
    console.error("MySQL Connection failed:", error.message);
    process.exit(1);
  }
  console.log("MySQL Connected Successfully!");
});

module.exports = con;

const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // max connections
  queueLimit: 0, // unlimited waiting
});

pool.query("SELECT 1", (error) => {
  if (error) {
    console.error("MySQL Pool Connection failed:", error.message);
    process.exit(1);
  }
  console.log("MySQL Pool Connected Successfully!");
});

module.exports = pool;

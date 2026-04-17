const mysql = require("mysql2/promise");
const { ENV } = require("./config/config");

const pool = mysql.createPool({
  host: ENV.DB_HOST,
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 50,
});

console.log("MySQL Pool Created");

module.exports = pool;

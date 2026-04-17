const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  ENV: {
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_USER: process.env.DB_USER || "root",
    DB_PASSWORD: process.env.DB_PASSWORD || "password",
    DB_NAME: process.env.DB_NAME || "my_database",
    JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",
  },
  PORT: process.env.PORT || 3000,
  EMAIL: {
    USER: process.env.EMAIL_USER,
    PASSWORD: process.env.EMAIL_PASSWORD,
  },
};

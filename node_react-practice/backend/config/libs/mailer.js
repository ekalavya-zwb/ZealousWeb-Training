const nodemailer = require("nodemailer");
const { EMAIL } = require("../config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL.USER,
    pass: EMAIL.PASSWORD,
  },
});

module.exports = transporter;

const transport = require("../config/libs/mailer");
const { EMAIL } = require("../config/config");

const sendEmail = async (from, to, subject, text) => {
  await transport.sendMail({
    from: EMAIL.USER,
    replyTo: from,
    to: to,
    subject: subject,
    text: text,
  });
};

module.exports = sendEmail;

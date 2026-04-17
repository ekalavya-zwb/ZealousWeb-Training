const cron = require("node-cron");
const sendEmail = require("../services/emailService");

cron.schedule(
  "* * * * *",
  async () => {
    console.log("Running cron job...");

    try {
      await sendEmail(
        "ekalavya@zealousweb.com",
        "ekalavyakumar2005@gmail.com",
        "Cron Job Email",
        "This email is sent by the cron job.",
      );
      console.log("Email sent successfully!");
    } catch (error) {
      console.error("Failed to send email", error);
    }
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata",
  },
);

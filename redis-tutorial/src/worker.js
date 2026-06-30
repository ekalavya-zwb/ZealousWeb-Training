const { Worker } = require("bullmq");
require("dotenv").config();
const { redisConnection } = require("./queue.js");
const nodemailer = require("nodemailer");

// Transporter configuration for nodemailer (using Gmail as an example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your actual Gmail address
    pass: process.env.EMAIL_PASSWORD, // The 16-character App Password you generated
  },
});

// Initialize the BullMQ Worker
const emailWorker = new Worker(
  "emails",
  async (job) => {
    console.log(`[Job ${job.id}] Starting email dispatch...`);

    // Extract the dynamic data you passed when creating the job
    const { to, subject, text } = job.data;

    // Define the mail options
    const mailOptions = {
      from: `Ekalavya ZealousWeb <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    };

    // Send the actual email
    const emailInfo = await transporter.sendMail(mailOptions);

    return { messageId: emailInfo.messageId };
  },
  {
    connection: redisConnection,
    concurrency: 1, // Processes 1 email at a time to prevent Gmail rate limits
  },
);

// Event Listeners
emailWorker.on("completed", (job, result) => {
  console.log(
    `✅ Job ${job.id} completed. Email sent with MessageID: ${result.messageId}`,
  );
});

emailWorker.on("failed", (job, err) => {
  console.error(
    `❌ Job ${job.id} failed to send email. Reason: ${err.message}`,
  );
});

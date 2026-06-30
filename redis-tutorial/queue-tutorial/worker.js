const { Worker } = require("bullmq");
const nodemailer = require("nodemailer");
require("dotenv").config();

// 1. Create the actual Gmail Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your actual Gmail address
    pass: process.env.EMAIL_PASSWORD, // The 16-character App Password you generated
  },
});

// Redis connection configuration
const redisConnection = {
  host: "127.0.0.1",
  port: 6379,
};

// 2. Initialize the BullMQ Worker
const emailWorker = new Worker(
  "email-queue",
  async (job) => {
    console.log(`[Job ${job.id}] Starting email dispatch...`);

    // Extract the dynamic data you passed when creating the job
    const { email, subject, body } = job.data;

    // 3. Define the mail options
    const mailOptions = {
      from: `"ZealousWeb Team" <${process.env.EMAIL_USER}>`, // Sender address
      to: email, // Receiver address
      subject: subject, // Subject line
      text: body, // Plain text body
      // html: `<b>${body}</b>` // You can also send HTML emails!
    };

    // 4. Send the actual email
    const info = await transporter.sendMail(mailOptions);

    console.log(`[Job ${job.id}] Email sent! MessageID: ${info.messageId}`);

    return { messageId: info.messageId };
  },
  {
    connection: redisConnection,
    concurrency: 1, // Processes 1 email at a time to prevent Gmail rate limits
  },
);

// Event Listeners
emailWorker.on("completed", (job, result) => {
  console.log(`🎉 Job ${job.id} completed. Email successfully delivered.`);
});

emailWorker.on("failed", (job, err) => {
  console.error(
    `❌ Job ${job.id} failed to send email. Reason: ${err.message}`,
  );
});

emailWorker.on("error", (err) => {
  console.error("Worker connection error:", err);
});

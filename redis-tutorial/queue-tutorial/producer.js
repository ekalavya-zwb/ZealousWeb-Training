const { Queue } = require("bullmq");
require("dotenv").config();

const emailQueue = new Queue("email-queue", {
  connection: {
    host: "127.0.0.1",
    port: 6379,
  },
  // 🔽 ADDED HERE (Applies to all jobs added to this queue automatically)
  defaultJobOptions: {
    attempts: 3, // Retry failed jobs up to 3 times
  },
});

async function init() {
  const jobsToCreate = [
    {
      name: "Email to ekalavyakumar2005@gmail.com",
      data: {
        email: "keklavya007@gmail.com",
        subject: "Test email from ekalavya@zealousweb.com",
        body: "This is a test email sent from the ZealousWeb email queue system.",
      },
    },
    {
      name: "Email to ekalavyakumar2005@gmail.com",
      data: {
        email: "ekalavyakumar2005@gmail.com",
        subject: "Test email from ekalavya@zealousweb.com",
        body: "This is a test email sent from the ZealousWeb email queue system.",
      },
    },
  ];

  try {
    const results = await emailQueue.addBulk(jobsToCreate);
    console.log(`Successfully added ${results.length} jobs to the queue!`);
    results.forEach((job) => {
      console.log(`Job created with ID: ${job.id}`);
    });
  } catch (error) {
    console.error("Failed to add bulk jobs:", error);
  } finally {
    await emailQueue.close();
  }
}

init();

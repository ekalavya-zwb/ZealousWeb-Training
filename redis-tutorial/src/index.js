const express = require("express");
const redis = require("ioredis");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const { emailQueue } = require("./queue.js");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Redis client configuration
const redisClient = new redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
});

// Redis client configuration for the publisher
const publisher = new redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
});

// MongoDB connection URI
const mongoURI =
  process.env.MONGO_URI || "mongodb://localhost:27017/my_mongo_db";

// Connect to Redis
app.get("/redis", async (req, res) => {
  try {
    const reply = await redisClient.ping();
    res.json({ redis: reply });
  } catch (error) {
    console.error("Error connecting to Redis:", error);
    res.status(500).json({ error: "Error connecting to Redis" });
  }
});

// Connect to MongoDB
app.get("/mongo", async (req, res) => {
  try {
    await mongoose.connect(mongoURI);
    res.json({
      mongo: "Connected to MongoDB successfully",
      database: mongoose.connection.name,
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    res.status(500).json({ error: "Error connecting to MongoDB" });
  }
});

// Transporter configuration for nodemailer (using Gmail as an example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // Your actual Gmail address
    pass: process.env.EMAIL_PASSWORD, // The 16-character App Password you generated
  },
});

// Website Site Banner Management
// This demonstrates how to use Redis for simple key-value storage, which is ideal for frequently accessed data that doesn't require complex querying.

// Redis key for the site banner
const SITE_BANNER_KEY = "app:banner";

// Endpoint to get the current site banner
app.get("/banner", async (req, res) => {
  try {
    const bannerMessage = await redisClient.get(SITE_BANNER_KEY);
    res.json({ message: bannerMessage });
  } catch (error) {
    console.error("Error fetching banner:", error);
    res.status(500).json({ error: "Error fetching banner" });
  }
});

// Endpoint to check if the banner exists
app.get("/banner/exists", async (req, res) => {
  try {
    const exists = await redisClient.exists(SITE_BANNER_KEY);
    res.json({ exists: !!exists });
  } catch (error) {
    console.error("Error checking banner existence:", error);
    res.status(500).json({ error: "Error checking banner existence" });
  }
});

// Endpoint to update the site banner
app.post("/banner", async (req, res) => {
  try {
    const { message = "Welcome to our site!" } = req.body;
    await redisClient.set(SITE_BANNER_KEY, message);
    res.json({ message: "Banner updated successfully" });
  } catch (error) {
    console.error("Error updating banner:", error);
    res.status(500).json({ error: "Error updating banner" });
  }
});

// Endpoint to delete the site banner
app.delete("/banner", async (req, res) => {
  try {
    await redisClient.del(SITE_BANNER_KEY);
    res.json({ message: "Banner deleted successfully" });
  } catch (error) {
    console.error("Error deleting banner:", error);
    res.status(500).json({ error: "Error deleting banner" });
  }
});

// OTP Management
// This demonstrates how to use Redis for temporary data storage with expiration, which is ideal for use cases like OTPs that need to be valid for a short period of time and should be automatically removed after expiration.

// Helper function to generate Redis key for OTP
function otpKey(phone) {
  return `otp:${phone}`;
}

// OTP generation endpoint
app.post("/otp", async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ error: "Phone number is required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    await redisClient.set(otpKey(phone), otp, "EX", 30); // OTP expires in 30 seconds
    res.json({ message: "OTP sent successfully", otp }); // In a real application, you would send the OTP via SMS instead of returning it in the response
  } catch (error) {
    console.error("Error generating OTP:", error);
    res.status(500).json({ error: "Error generating OTP" });
  }
});

// OTP verification endpoint
app.post("/otp/verify", async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const storedOtp = await redisClient.get(otpKey(phone));

    if (!phone || !otp) {
      return res
        .status(400)
        .json({ error: "Phone number and OTP are required" });
    }

    if (!storedOtp) {
      return res
        .status(400)
        .json({ error: "OTP has expired or does not exist" });
    }

    if (storedOtp === otp) {
      await redisClient.del(otpKey(phone)); // OTP is valid, delete it from Redis
      res.json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: "Error verifying OTP" });
  }
});

// OTP TTL endpoint
app.get("/otp/:phone/ttl", async (req, res) => {
  try {
    const { phone } = req.params;
    const ttl = await redisClient.ttl(otpKey(phone));

    if (ttl === -2) {
      return res.status(404).json({ error: "OTP does not exist" });
    }

    res.json({ ttl });
  } catch (error) {
    console.error("Error fetching OTP TTL:", error);
    res.status(500).json({ error: "Error fetching OTP TTL" });
  }
});

// User data management endpoints (JSON)
// This is a simple way to store user data as a JSON string, but it requires rewriting the entire string for updates, which can be inefficient for large data.

// Endpoint to create/update user data as JSON
app.post("/user/:id/json", async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    await redisClient.set(`user:${id}:json`, JSON.stringify(userData));
    res.json({ message: "User data updated successfully", savedAs: "json" });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ error: "Error updating user data" });
  }
});

// Endpoint to get user data stored as JSON
app.get("/user/:id/json", async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await redisClient.get(`user:${id}:json`);

    if (!userData) {
      return res.status(404).json({ error: "User data not found" });
    }

    res.json(JSON.parse(userData));
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Error fetching user data" });
  }
});

// Endpoint to delete user data stored as JSON
app.delete("/user/:id/json", async (req, res) => {
  try {
    const { id } = req.params;
    await redisClient.del(`user:${id}:json`);
    res.json({ message: "User data deleted successfully" });
  } catch (error) {
    console.error("Error deleting user data:", error);
    res.status(500).json({ error: "Error deleting user data" });
  }
});

// User data management endpoints (Hash)
// This is more efficient for storing structured data and allows for partial updates without needing to rewrite the entire JSON string.

// Endpoint to create/update user data as a hash
app.post("/user/:id/hash", async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    await redisClient.hset(`user:${id}:hash`, userData);
    res.json({ message: "User data updated successfully", savedAs: "hash" });
  } catch (error) {
    console.error("Error updating user data:", error);
    res.status(500).json({ error: "Error updating user data" });
  }
});

// Endpoint to get user data stored as a hash
app.get("/user/:id/hash", async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await redisClient.hgetall(`user:${id}:hash`);

    if (!userData || Object.keys(userData).length === 0) {
      return res.status(404).json({ error: "User data not found" });
    }

    res.json(userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Error fetching user data" });
  }
});

// Endpoint to delete user data stored as a hash
app.delete("/user/:id/hash", async (req, res) => {
  try {
    const { id } = req.params;
    await redisClient.hdel(`user:${id}:hash`);
    res.json({ message: "User data deleted successfully" });
  } catch (error) {
    console.error("Error deleting user data:", error);
    res.status(500).json({ error: "Error deleting user data" });
  }
});

// Email Queue
// This demonstrates how to use Redis lists to implement a simple queue for processing tasks asynchronously, which is ideal for use cases like email sending where you want to decouple the task from the request-response cycle.

// Redis key for the email queue
const QUEUE_KEY = "email:queue";

// Endpoint to enqueue an email
app.post("/email", async (req, res) => {
  try {
    const { to, subject = "No Subject", text = "No body" } = req.body;

    if (!to) {
      return res
        .status(400)
        .json({ error: "Recipient email address is required" });
    }

    const job = {
      from: `Ekalavya ZealousWeb <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      createdAt: new Date().toISOString(),
    };

    await redisClient.lpush(QUEUE_KEY, JSON.stringify(job));
    res.json({ message: "Email added to queue successfully", job });
  } catch (error) {
    console.error("Error enqueueing email:", error);
    res.status(500).json({ error: "Error enqueueing email" });
  }
});

// Endpoint to process an email from the queue
app.get("/email/process-one", async (req, res) => {
  try {
    const jobData = await redisClient.rpop(QUEUE_KEY);

    if (!jobData) {
      return res.status(404).json({ error: "No emails in queue" });
    }

    const job = JSON.parse(jobData);
    const email = await transporter.sendMail(job);
    res.json({
      message: "Email processed successfully with ID: " + email.messageId,
    });
  } catch (error) {
    console.error("Error processing email:", error);
    res.status(500).json({ error: "Error processing email" });
  }
});

// Endpoint to add multiple emails to the queue in bulk
app.post("/email/process-all", async (req, res) => {
  const jobs = [
    {
      name: "email-to-ekalavyakumar2005@gmail.com",
      data: {
        to: "keklavya007@gmail.com",
        subject: "Test email from ekalavya@zealousweb.com",
        text: "This is a test email sent from the ZealousWeb email queue system.",
      },
    },
    {
      name: "email-to-ekalavyakumar2005@gmail.com",
      data: {
        to: "ekalavyakumar2005@gmail.com",
        subject: "Test email from ekalavya@zealousweb.com",
        text: "This is a test email sent from the ZealousWeb email queue system.",
      },
      opts: {
        attempts: 3, // Retry failed jobs up to 3 times
        backoff: {
          type: "exponential",
          delay: 5000, // Initial delay of 5 seconds before retrying
        },
      },
    },
  ];

  try {
    const results = await emailQueue.addBulk(jobs);
    console.log(`Successfully added ${results.length} jobs to the queue!`);
    results.forEach((job) => {
      console.log(`Job ${job.name} created with ID: ${job.id}`);
    });
    res.json({
      message: `Successfully added ${results.length} jobs to the queue!`,
    });
  } catch (error) {
    console.error("Failed to add bulk jobs:", error);
    res.status(500).json({ error: "Failed to add bulk jobs" });
  }
});

// Notifications using Pub/Sub
// This demonstrates how to use Redis Pub/Sub for real-time messaging between different parts of your application, which is ideal for use cases like notifications where you want to broadcast messages to multiple subscribers.
app.post("/notifications", async (req, res) => {
  try {
    const { title, message } = req.body;
    const payload = {
      title,
      message,
      createdAt: new Date().toISOString(),
    };

    if (!title || !message) {
      return res
        .status(400)
        .json({ error: "Title and message are required for notifications" });
    }

    const recipients = await publisher.publish(
      "notifications",
      JSON.stringify(payload),
    );
    res.json({ message: "Notification published successfully", recipients });
  } catch (error) {
    console.error("Error publishing notification:", error);
    res.status(500).json({ error: "Error publishing notification" });
  }
});

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

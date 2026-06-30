const { Queue } = require("bullmq");
const redis = require("ioredis");
require("dotenv").config();

// Redis client configuration
const redisConnection = new redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
  maxRetriesPerRequest: null, // Disable retries for better error handling
});

// Initialize the BullMQ Queue
const emailQueue = new Queue("emails", {
  connection: redisConnection,
});

module.exports = {
  emailQueue,
  redisConnection,
};

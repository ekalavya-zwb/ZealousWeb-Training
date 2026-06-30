const redis = require("ioredis");

// Redis keys
const LEADERBOARD_KEY = "game:leaderboard";
const TOTAL_SCORES_KEY = "game:total_scores";
const LEADERBOARD_CHANNEL = "leaderboard:updates"; // Pub/Sub channel for leaderboard updates

// Redis configuration
const redisConfig = {
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
};

// Connection 1: For handling leaderboard data and player stats operations
const redisDB = new redis(redisConfig);
// Connection 2: For publishing updates to clients when scores are updated and when the leaderboard changes
const redisPublisher = new redis(redisConfig);
// Connection 3: For subscribing to updates and broadcasting to clients in real-time
const redisSubscriber = new redis(redisConfig);

module.exports = {
  redisDB,
  redisPublisher,
  redisSubscriber,
  LEADERBOARD_KEY,
  TOTAL_SCORES_KEY,
  LEADERBOARD_CHANNEL,
};

const redis = require("ioredis");
require("dotenv").config();

// Define the channel to subscribe to
module.exports = channel = "notifications";

const subscriber = new redis({
  host: process.env.REDIS_HOST || "localhost",
  port: process.env.REDIS_PORT || 6379,
});

subscriber.subscribe(channel, (err, count) => {
  if (err) {
    console.error("Failed to subscribe: %s", err.message);
  } else {
    console.log(
      `Subscribed successfully! This client is currently subscribed to ${count} channels.`,
    );
  }
});

subscriber.on("message", (channel, message) => {
  const parsedMessage = JSON.parse(message);
  console.log(
    `Received message from ${channel}: ${parsedMessage.title} - ${parsedMessage.message}`,
  );
  // Here you can add logic to handle the received message, such as sending notifications to users or updating the UI in real-time.
});

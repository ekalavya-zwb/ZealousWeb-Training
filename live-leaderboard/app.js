const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();
const {
  redisDB,
  redisSubscriber,
  redisPublisher,
  LEADERBOARD_KEY,
  LEADERBOARD_CHANNEL,
  TOTAL_SCORES_KEY,
} = require("./config/redis");
const {
  updatePlayerScore,
  getLeaderboard,
  getPlayerStats,
} = require("./services/leaderboard");
const { getFormattedLeaderboard } = require("./utils/formatLeaderboard");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Function to broadcast the updated leaderboard to all connected clients
async function broadcastLeaderboard() {
  try {
    const rawLeaderboard = await getLeaderboard(10);
    const formattedLeaderboard = getFormattedLeaderboard(rawLeaderboard);

    // Broadcast the updated leaderboard to all connected clients
    io.emit("leaderboardUpdate", formattedLeaderboard);
  } catch (error) {
    console.error("Error broadcasting leaderboard:", error);
  }
}

// Subscribe to the leaderboard updates channel
redisSubscriber.subscribe(LEADERBOARD_CHANNEL, (err, count) => {
  if (err) {
    console.error(`Failed to subscribe to ${LEADERBOARD_CHANNEL} channel`, err);
    return;
  }
  console.log(
    `Subscribed to ${LEADERBOARD_CHANNEL} channel for leaderboard updates`,
  );
});

// Listen for messages on the subscribed channel and broadcast updates to clients
redisSubscriber.on("message", async (channel, message) => {
  if (channel === LEADERBOARD_CHANNEL) {
    console.log("Received message:", message);
    await broadcastLeaderboard();
  }
});

// Handle WebSocket connections
io.on("connection", async (socket) => {
  console.log(`New client connected: ${socket.id}`);

  try {
    const rawLeaderboard = await getLeaderboard(10);
    const formattedLeaderboard = getFormattedLeaderboard(rawLeaderboard);

    // Send the current leaderboard to the newly connected client
    socket.emit("leaderboardUpdate", formattedLeaderboard);
  } catch (error) {
    console.error("Error fetching leaderboard on new connection:", error);
  }

  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// API endpoint to check if the server is running
app.get("/", (req, res) => {
  res.send("Welcome to the Live Leaderboard API!");
});

// API endpoint to update player score
app.post("/leaderboard/score", async (req, res) => {
  const { playerId, score } = req.body;

  if (!playerId || typeof score !== "number") {
    return res
      .status(400)
      .json({ error: "playerId and score (number) are required" });
  }

  try {
    await updatePlayerScore(playerId, score);
    res.status(200).json({ message: "Score updated successfully" });

    // Publish a message to the leaderboard updates channel to notify clients of the change
    await redisPublisher.publish(
      LEADERBOARD_CHANNEL,
      "Score updated. Refresh leaderboard",
    );
  } catch (error) {
    console.error("Error updating player score:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API endpoint to get the leaderboard
app.get("/leaderboard", async (req, res) => {
  const topN = Number(req.query.topN) || 10;

  try {
    const leaderboard = await getLeaderboard(topN);
    const formattedLeaderboard = getFormattedLeaderboard(leaderboard);
    res.status(200).json({ leaderboard: formattedLeaderboard });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API endpoint to get a player's rank
app.get("/leaderboard/:playerId/rank", async (req, res) => {
  const { playerId } = req.params;

  try {
    const stats = await getPlayerStats(playerId);

    if (stats.rank === null || stats.score === null) {
      return res.status(404).json({ error: "Player not found on leaderboard" });
    }

    res.status(200).json({ rank: `#${stats.rank}`, score: stats.score });
  } catch (error) {
    console.error("Error fetching player stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server and listen on the specified port
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const http = require("http");
const path = require("path");
const express = require("express");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Route to serve the main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Handle WebSocket connections
io.on("connection", (socket) => {
  // Listen for user registration
  socket.on("registerUser", (username) => {
    console.log(`User registered: ${username} (ID: ${socket.id})`);
    socket.username = username; // Store the username in the socket object
  });

  // Listen for chat messages from clients
  socket.on("chatMessage", (message) => {
    // Broadcast the message to all connected clients
    io.emit("chatMessage", {
      message,
      username: socket.username || "Anonymous",
      senderId: socket.id,
      timestamp: new Date().toISOString(),
    });
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(
      `User disconnected: ${socket.username || "Unknown"} (ID: ${socket.id})`,
    );
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

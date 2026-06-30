const http = require("http");
const fs = require("fs/promises");
const path = require("path");
const { WebSocketServer } = require("ws");
const { redisPublish, redisSubscribe } = require("./connection.js");
const { channel } = require("diagnostics_channel");

const PORT = process.env.PORT ?? 3000;
const REDIS_CHANNEL = "ws-messages";

const httpServer = http.createServer(async function (req, res) {
  const indexFile = await fs.readFile(path.resolve("./index.html"), "utf-8");
  res.setHeader("Content-Type", "text/html");
  return res.end(indexFile);
});

const wsServer = new WebSocketServer({ server: httpServer });
redisSubscribe.subscribe(REDIS_CHANNEL);

redisSubscribe.on("message", (channel, message) => {
  if (channel === REDIS_CHANNEL) {
    // Broadcasts the message to all the connected ws clients
    wsServer.clients.forEach((client) => {
      client.send(message.toString());
    });
  }
});

wsServer.on("connection", (websocket) => {
  console.log("Websocket Connection...");

  websocket.on("message", async (data) => {
    // Sends the message back to the ws client who originated it
    // websocket.send(data.toString());
    // Broadcasts the message to all the connected ws clients
    // wsServer.clients.forEach((client) => {
    //   client.send(data.toString());
    // });
    // Relay message to the broker like redis
    console.log("Relaying Message to Redis Broker...");
    await redisPublish.publish(REDIS_CHANNEL, data.toString());
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

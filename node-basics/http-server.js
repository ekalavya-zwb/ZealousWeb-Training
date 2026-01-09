const http = require("http");
const handleRoutes = require("./http-routes.js");

const PORT = 3000;

const server = http.createServer((req, res) => {
  handleRoutes(req, res);
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

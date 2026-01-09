function handleRoutes(req, res) {
  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("<h1>Welcome to my Home page!</h1>");
  } else if (req.url === "/about" && req.method === "GET") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end("<h1>Welcome to my About page!</h1>");
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end("<h1>404 - Page Not Found</h1>");
  }
}

module.exports = handleRoutes;

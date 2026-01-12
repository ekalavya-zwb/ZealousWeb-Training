const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.set("json spaces", 2);

let users = [
  { id: 1, name: "Ekalavya", email: "ekalavya@gmail.com" },
  { id: 2, name: "Aman", email: "aman@gmail.com" },
  { id: 3, name: "Ansh", email: "ansh@gmail.com" },
];

let products = [
  { id: 1, name: "Mobile", price: 25000 },
  { id: 2, name: "Laptop", price: 70000 },
  { id: 3, name: "Headphone", price: 5000 },
];

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to my express application!",
    users: "/api/users",
    products: "/api/products",
  });
});

app.get("/api", (req, res) => {
  res.status(200).json({
    users: "/api/users",
    products: "/api/products",
  });
});

app.get("/api/users", (req, res) => {
  res.status(200).json(users);
});

app.get("/api/products", (req, res) => {
  res.status(200).json(products);
});

app.get("/api/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    res.status(404).json({ error: "User not found!" });
  }

  res.status(200).json(user);
});

app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    res.status(404).json({ error: "Product not found!" });
  }

  res.status(200).json(product);
});

app.get("/api/search", (req, res) => {
  const name = req.query.name;

  if (!name) {
    res.status(400).json({ error: "Please provide a name to search!" });
  }

  res.status(200).json({ message: `Searching for: ${name}` });
});

app.use((req, res) => {
  res.status(404).json({ error: "404 - Page Not Found!" });
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});

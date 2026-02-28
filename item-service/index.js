const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8081;

app.use(cors());
app.use(express.json());

let items = [
  { id: 1, name: "Book" },
  { id: 2, name: "Laptop" },
  { id: 3, name: "Phone" }
];

// GET /items
app.get("/items", (req, res) => {
  res.json(items);
});

// POST /items
app.post("/items", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Item name is required" });
  }

  const newItem = {
    id: items.length + 1,
    name
  };

  items.push(newItem);
  res.status(201).json(newItem);
});

// GET /items/:id
app.get("/items/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find((i) => i.id === id);

  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  res.json(item);
});

app.listen(PORT, () => {
  console.log(`Item Service running on port ${PORT}`);
});
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8082;

app.use(cors());
app.use(express.json());

let orders = [];
let currentId = 1;

app.get("/orders", (req, res) => {
  res.json(orders);
});

app.post("/orders", (req, res) => {
  const { item, quantity, customerId } = req.body;

  if (!item || !quantity || !customerId) {
    return res.status(400).json({
      message: "item, quantity, and customerId are required"
    });
  }

  const newOrder = {
    id: currentId++,
    item,
    quantity,
    customerId,
    status: "PENDING"
  };

  orders.push(newOrder);
  res.status(201).json(newOrder);
});

app.get("/orders/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const order = orders.find((o) => o.id === id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
});

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});
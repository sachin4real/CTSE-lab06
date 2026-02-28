const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8083;

app.use(cors());
app.use(express.json());

let payments = [];
let idCounter = 1;

// GET /payments
app.get("/payments", (req, res) => {
  res.json(payments);
});

// POST /payments/process
app.post("/payments/process", (req, res) => {
  const { orderId, amount, method } = req.body;

  if (!orderId || amount === undefined || !method) {
    return res.status(400).json({
      message: "orderId, amount, and method are required"
    });
  }

  const payment = {
    id: idCounter++,
    orderId,
    amount,
    method,
    status: "SUCCESS"
  };

  payments.push(payment);
  res.status(201).json(payment);
});

// GET /payments/:id
app.get("/payments/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const payment = payments.find((p) => p.id === id);

  if (!payment) {
    return res.status(404).json({ message: "Payment not found" });
  }

  res.json(payment);
});

app.listen(PORT, () => {
  console.log(`Payment Service running on port ${PORT}`);
});
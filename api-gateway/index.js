const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use(
  "/items",
  createProxyMiddleware({
    target: "http://item-service:8081/items",
    changeOrigin: true,
    pathRewrite: {
      "^/items": ""
    }
  })
);

app.use(
  "/orders",
  createProxyMiddleware({
    target: "http://order-service:8082/orders",
    changeOrigin: true,
    pathRewrite: {
      "^/orders": ""
    }
  })
);

app.use(
  "/payments",
  createProxyMiddleware({
    target: "http://payment-service:8083/payments",
    changeOrigin: true,
    pathRewrite: {
      "^/payments": ""
    }
  })
);

app.get("/", (req, res) => {
  res.json({ message: "API Gateway is running" });
});

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
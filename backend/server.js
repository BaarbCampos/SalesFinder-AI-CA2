require("dotenv").config();

const express = require("express");
const cors = require("cors");

const productRoutes = require("./src/routes/productRoutes");
const recommendationRoutes = require("./src/routes/recommendationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "SalesFinder AI Backend is running!"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "OK"
  });
});

app.use("/api/products", productRoutes);
app.use("/api/recommendations", recommendationRoutes);

app.post("/api/chat", (req, res) => {
  res.status(503).json({
    success: false,
    message: "AI assistant is not configured yet. Ollama integration is pending."
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`SalesFinder AI backend running on port ${PORT}`);
});

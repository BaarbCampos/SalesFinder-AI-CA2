require("dotenv").config();

const express = require("express");
const cors = require("cors");

const productRoutes = require("./src/routes/productRoutes");
const recommendationRoutes = require("./src/routes/recommendationRoutes");
const { generateBeautyResponse } = require("./src/services/geminiService");

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

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: "Message is required."
      });
    }

    const reply = await generateBeautyResponse(message.trim());

    res.json({
      success: true,
      reply
    });

  } catch (error) {
    console.error("Gemini error:", error.message);

    res.status(500).json({
      success: false,
      error: "Unable to generate a response. Please try again."
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`SalesFinder AI backend running on port ${PORT}`);
});

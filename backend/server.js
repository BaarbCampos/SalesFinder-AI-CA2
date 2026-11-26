require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.get("/", (req, res) => {
  res.json({ message: "SalesFinder AI Backend is running!" });
});

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required." });
    }

    const response = await openai.responses.create({
      model: "gpt-5-mini",
      instructions: "You are SalesFinder AI, a friendly beauty shopping assistant. Help users discover cosmetics, skincare and perfumes. Ask about their preferences and budget. Do not invent product prices or availability.",
      input: message,
    });

    res.json({ reply: response.output_text });
  } catch (error) {
    console.error("OpenAI error:", error.message);
    res.status(500).json({ error: "Unable to process your request." });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`SalesFinder AI backend running on port ${PORT}`);
});

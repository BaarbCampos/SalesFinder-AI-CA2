
const { GoogleGenAI } = require("@google/genai");
const products = require("../data/products");

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing from .env");
}

const ai = new GoogleGenAI({ apiKey });

async function generateBeautyResponse(message) {
  const productCatalogue = products.map(product => ({
    name: product.name,
    brand: product.brand,
    category: product.category,
    price: product.price,
    description: product.description
  }));

  const prompt = `
You are SalesFinder AI, a friendly beauty shopping assistant.

Available products:
${JSON.stringify(productCatalogue, null, 2)}

Rules:
- Help users discover skincare, makeup and perfumes.
- Be friendly and helpful.
- Recommend only products from the catalogue.
- Never invent products, prices or availability.
- All prices are in euros.
- Explain why a product matches the user's preferences.
- Ask questions when more information is needed.

User message:
${message}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash-lite",
    contents: prompt
  });

  return response.text;
}

module.exports = { generateBeautyResponse };

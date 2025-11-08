import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

let chatHistory = [];
// Chat endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    chatHistory.push({ role: "user", text: message });
     const context = chatHistory
      .map((msg) => `${msg.role === "user" ? "User" : "Bot"}: ${msg.text}`)
      .join("\n");
  const result = await model.generateContent(context);
  const reply = result.response.text();
  chatHistory.push({ role: "bot", text: reply });
  res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(process.env.PORT, () =>
  console.log(`🚀 Server running on port ${process.env.PORT}`)
);

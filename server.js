import express from "express";
import multer from "multer";
import cors from "cors";
import pdf from "pdf-parse";
import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config(); // Load environment variables

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());

app.post("/api/upload", upload.single("pdf"), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ message: "No file received" });
  }

  const filePath = path.resolve(file.path); // Use path to resolve file path

  try {
    await fs.access(filePath); // Check if file exists
  } catch (err) {
    return res.status(400).json({ message: "File not found" });
  }

  try {
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdf(dataBuffer);
    const extractedText = data.text;

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    async function main() {
      const chatCompletion = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: `Fasse den folgenden Text sehr sehr einfach zusammen:\n\n${extractedText}\n\nZusammenfassung:`,
          },
        ],
        model: "gpt-3.5-turbo",
      });
      console.log(chatCompletion.choices);
      const summary = chatCompletion.choices[0].message.content;
      res.status(200).json({ summary });
    }

    main();
  } catch (error) {
    res.status(500).json({ message: "Error extracting text", error });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
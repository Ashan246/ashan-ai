// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post("/api/chat", async (req, res) => {
    try {
        const { message } = req.body;

        const response = await openai.chat.completions.create({
            model: "gpt-5-mini",
            messages: [{ role: "user", content: message }]
        });

        const reply = response.choices[0].message.content;
        res.json({ reply });
    } catch (error) {
        console.error(error);
        res.status(500).json({ reply: "AI සමඟ සම්බන්ධ විය නොහැක." });
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));
// server.js (add this along with chat endpoint)
app.post("/api/image", async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await openai.images.generate({
            model: "gpt-image-1",
            prompt: prompt,
            size: "1024x1024"
        });

        const imageUrl = response.data[0].url;
        res.json({ url: imageUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ url: null });
    }
});

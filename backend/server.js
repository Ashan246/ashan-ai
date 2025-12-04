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
// server.js (add this along with chat & image endpoints)
app.post("/api/video", async (req, res) => {
    try {
        const { prompt } = req.body;

        // Example: replace with real AI video generation API
        const response = await openai.videos.generate({
            model: "gpt-video-1",
            prompt: prompt,
            size: "720p",
            length: 10 // 10 seconds video
        });

        const videoUrl = response.data[0].url;
        res.json({ url: videoUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ url: null });
    }
});
// server.js (add this along with other endpoints)
app.post("/api/music", async (req, res) => {
    try {
        const { prompt } = req.body;

        // Example: replace with real AI music generation API
        const response = await openai.audio.generate({
            model: "gpt-music-1",
            prompt: prompt,
            format: "mp3",
            length: 30 // 30 seconds music
        });

        const musicUrl = response.data[0].url;
        res.json({ url: musicUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json({ url: null });
    }
});
// server.js (add this along with other endpoints)
app.post("/api/app", async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await openai.chat.completions.create({
            model: "gpt-5-mini",
            messages: [
                { role: "user", content: `Generate a working app / website code for: ${prompt}` }
            ]
        });

        const code = response.choices[0].message.content;
        res.json({ code });
    } catch (error) {
        console.error(error);
        res.status(500).json({ code: null });
    }
});
app.post("/api/chat", async (req, res) => {
    const userId = req.body.userId; // send logged in user id
    const prompt = req.body.message;

    if (!(await canUseFeature(userId, "chat"))) {
        return res.status(403).json({ reply: "Free limit පුරා. Upgrade කරන්න." });
    }

    // Call OpenAI
    const response = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages: [{ role: "user", content: prompt }]
    });

    const reply = response.choices[0].message.content;
    await incrementUsage(userId, "chat");
    res.json({ reply });
});
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-checkout-session", async (req, res) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "lkr",
                    product_data: { name: "Ashan AI Unlimited Access" },
                    unit_amount: 50000 // 500.00 LKR
                },
                quantity: 1
            }
        ],
        mode: "payment",
        success_url: "https://ashan-ai.vercel.app/payment-success?userId=USER_ID",
        cancel_url: "https://ashan-ai.vercel.app/payment-cancel"
    });

    res.json({ id: session.id });
});

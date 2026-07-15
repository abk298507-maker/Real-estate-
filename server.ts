import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes first
  app.post("/api/ai", async (req, res) => {
    try {
      const { prompt, orgRole, isMasterUser } = req.body;

      if (!prompt) {
        res.status(400).json({ error: "Prompt is required" });
        return;
      }

      const role = orgRole || (isMasterUser ? "org:admin" : "member");

      let systemPrompt = "";
      if (role === 'org:admin') {
        systemPrompt = `You are the executive AI Assistant for 'Sharma Prop Mart'. 
The person talking to you is the MASTER USER / OWNER of the agency. 
You have full authorization to discuss business revenue, agent performance, company growth strategy, and sensitive property listings. 
Address them respectfully as Owner/Sir/Ma'am. Keep responses analytical and premium.`;
      } else {
        systemPrompt = `You are the AI Assistant for 'Sharma Prop Mart'. 
The person talking to you is a Sub-User / Real Estate Agent. 
You are NOT allowed to share company financial secrets or other agents' data. 
Help them only with property description writing, lead communication, and client negotiation tips.`;
      }

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          systemInstruction: systemPrompt,
        }
      });

      const aiReply = response.text || "No response from AI";
      res.json({ reply: aiReply });
    } catch (error: any) {
      console.error("AI Error:", error);
      res.status(500).json({ error: "Server Error: " + (error?.message || error) });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

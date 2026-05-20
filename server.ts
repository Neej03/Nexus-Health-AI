import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini client (fails gracefully at runtime without key)
  const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY || "missing",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Route for the Assistant Chat
  app.post("/api/chat", async (req, res) => {
    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY environment variable is required.");
      }
      
      const { systemPrompt, messages } = req.body;
      
      // First, process previous messages (if any) to set up history
      if (messages && messages.length > 0) {
        // Last message is the current user input
        const userMsg = messages[messages.length - 1].content;
        
        // We'll just handle it by concatenating for simplicity or re-sending history.
        // Actually we can feed history using standard `chat.sendMessage` sequentially, 
        // OR better pass everything as contents, but we created a chat session.
        // For simplicity, we can pass older messages into the history when creating the chat
        const historyData = messages.slice(0, -1).map((m: any) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }]
        }));
        
        const chatWithHistory = ai.chats.create({
          model: "gemini-2.5-flash",
          config: {
            systemInstruction: systemPrompt,
          },
          history: historyData
        });
        
        const response = await chatWithHistory.sendMessage({ message: userMsg });
        res.json({ reply: response.text });
      } else {
        res.status(400).json({ error: "No messages provided." });
      }
    } catch (error: any) {
      console.error("Chat API Error:", error);
      res.status(500).json({ error: error.message || "Failed to process chat request." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving static files
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Note: express v4 is used (app.get('*', ...)), in package.json express is ^4.21.2
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

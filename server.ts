import express from "express";
import path from "path";
import fs from "fs";

async function startServer() {
  console.log("Starting server...");
  const app = express();
  const PORT = 3000;

  app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
  });

  app.use(express.json());

  // API Routes
  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite
  console.log("Initializing Vite...");
  try {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite initialized.");
  } catch (error) {
    console.error("Vite init failed:", error);
  }

  if (process.env.NODE_ENV === "production") {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      const indexPath = path.join(distPath, 'index.html');
      let html = fs.readFileSync(indexPath, 'utf-8');
      html = html.replace(
        '</head>',
        `<script>window.GEMINI_API_KEY = "${process.env.GEMINI_API_KEY}";</script></head>`
      );
      res.send(html);
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);

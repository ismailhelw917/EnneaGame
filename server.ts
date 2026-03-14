import express from "express";

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

  app.all("/*", (req, res, next) => {
    console.log(`API request: ${req.method} ${req.url}`);
    next();
  });

  app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
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

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);

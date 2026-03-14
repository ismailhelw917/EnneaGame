import express from "express";
import Database from "better-sqlite3";
import path from "path";

const db = new Database("newsletter.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    type TEXT,
    consent BOOLEAN NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  console.log("Starting server...");
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.use((req, res, next) => {
    console.log(`Received request: ${req.method} ${req.url}`);
    next();
  });

  // API Routes
  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/newsletter", (req, res) => {
    const { name, email, type, consent } = req.body;
    
    if (!name || !email || consent === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const stmt = db.prepare("INSERT INTO subscribers (name, email, type, consent) VALUES (?, ?, ?, ?)");
      stmt.run(name, email, type || null, consent ? 1 : 0);
      res.json({ success: true });
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        res.status(400).json({ error: "Email is already subscribed." });
      } else {
        console.error("Database error:", error);
        res.status(500).json({ error: "Database error occurred." });
      }
    }
  });

  // Vite
  console.log("Initializing Vite...");
  try {
    if (process.env.NODE_ENV !== "production") {
      const { createServer: createViteServer } = await import("vite");
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: "spa",
      });
      app.use(vite.middlewares);
      console.log("Vite initialized.");
    } else {
      const distPath = path.join(process.cwd(), 'dist');
      app.use(express.static(distPath));
      app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
      });
    }
  } catch (error) {
    console.error("Vite init failed:", error);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer().catch(console.error);

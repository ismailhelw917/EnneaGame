import express from "express";
import Stripe from "stripe";

const getStripe = () => {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is required");
  return new Stripe(key);
};

async function startServer() {
  console.log("Starting server...");
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Stripe Routes
  app.post("/api/create-donation-session", async (req, res) => {
    try {
      const { amount, label } = req.body;
      const stripe = getStripe();
      const baseUrl = process.env.APP_URL || `http://localhost:${PORT}`;
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{
          price_data: {
            currency: "usd",
            product_data: { name: `Donation: ${label}` },
            unit_amount: amount,
          },
          quantity: 1,
        }],
        mode: "payment",
        success_url: `${baseUrl}/donations?payment=success`,
        cancel_url: `${baseUrl}/donations`,
      });
      res.json({ url: session.url });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
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

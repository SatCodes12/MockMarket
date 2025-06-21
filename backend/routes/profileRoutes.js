import express from "express";
import db from "../db/index.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await db.query(
      "SELECT name, username, email, dob FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

router.get("/balance", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await db.query("SELECT balance FROM users WHERE id = $1", [userId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching balance:", error);
    res.status(500).json({ error: "Failed to fetch balance" });
  }
});

router.get("/stockholding/:symbol", isAuthenticated, async (req, res) => {
  try {
    const userId = req.user.id;
    const symbol = req.params.symbol.toUpperCase();

    const result = await db.query(
      "SELECT quantity, avg_buy_price FROM user_holdings WHERE user_id = $1 AND company_symbol = $2",
      [userId, symbol]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Stock holding not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching stock holding:", error);
    res.status(500).json({ error: "Failed to fetch stock holding" });
  }
});

export default router;
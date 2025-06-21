import express from "express";
import db from "../db/index.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.get("/", isAuthenticated, async (req, res) => {
    const userId = req.user.id;

    try {
        const result = await db.query(
            `SELECT user_holdings.id, user_holdings.company_symbol, companies.name, quantity, avg_buy_price 
            FROM user_holdings 
            INNER JOIN companies 
            ON user_holdings.company_symbol = companies.symbol WHERE user_id = $1`,
            [userId]
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching holdings:", error);
        res.status(500).json({ error: "Failed to fetch holdings" });
    }
});

router.get("/total", isAuthenticated, async (req, res) => {
    const userId = req.user.id;

    try {
        const result = await db.query(
            "SELECT SUM(avg_buy_price * quantity) AS total_value FROM user_holdings WHERE user_id = $1",
            [userId]
        );

        res.json({ totalHoldingsValue: result.rows[0].total_value || 0 });
    } catch (error) {
        console.error("Error fetching total holdings value:", error);
        res.status(500).json({ error: "Failed to fetch total holdings value" });
    }
});

export default router;
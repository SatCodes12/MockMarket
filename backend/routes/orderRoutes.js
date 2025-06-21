import express from "express";
import db from "../db/index.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/buy", isAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const symbol = req.body.symbol;
    const currPrice = req.body.currPrice;
    const qty = req.body.qty;

    const totalCost = currPrice * qty;

    try {
        const balanceResult = await db.query(
            "SELECT balance FROM users WHERE id = $1",
            [userId]
        );
        const currentBalance = parseFloat(balanceResult.rows[0].balance);

        if (totalCost > currentBalance) {
            return res.status(400).json({ error: "Insufficient balance." });
        }

        const initial = await db.query(
            "SELECT quantity, avg_buy_price FROM user_holdings WHERE user_id = $1 AND company_symbol = $2",
            [userId, symbol]
        );

        if (initial.rows.length === 0) {
            await db.query(
                "INSERT INTO user_holdings(user_id, company_symbol, quantity, avg_buy_price) VALUES ($1, $2, $3, $4)",
                [userId, symbol, qty, currPrice]
            );
        } else {
            const initialQty = initial.rows[0].quantity;
            const initialPrice = initial.rows[0].avg_buy_price;
            const newQty = initialQty + qty;
            const newPrice = (initialPrice * initialQty + currPrice * qty) / newQty;

            await db.query(
                "UPDATE user_holdings SET quantity = $1, avg_buy_price = $2 WHERE user_id = $3 AND company_symbol = $4",
                [newQty, newPrice, userId, symbol]
            );
        }

        await db.query(
            "UPDATE users SET balance = balance - $1 WHERE id = $2",
            [totalCost, userId]
        );

        await db.query(
            "INSERT INTO trades(user_id, company_symbol, price, quantity, type) VALUES ($1, $2, $3, $4, $5)",
            [userId, symbol, currPrice, qty, 'buy']
        );

        res.status(200).json({ message: "Buy trade successful and balance updated." });
    } catch (error) {
        console.error("Error processing buy:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/sell", isAuthenticated, async (req, res) => {
    const userId = req.user.id;
    const symbol = req.body.symbol;
    const currPrice = req.body.currPrice;
    const qty = req.body.qty;

    const totalValue = currPrice * qty;

    try {
        const result = await db.query(
            "SELECT quantity FROM user_holdings WHERE user_id = $1 AND company_symbol = $2",
            [userId, symbol]
        );

        if (result.rows.length === 0) {
            return res.status(400).json({ error: "You do not own this stock." });
        }

        const initialQty = result.rows[0].quantity;

        if (qty > initialQty) {
            return res.status(400).json({ error: "Not enough shares to sell." });
        }

        if (qty === initialQty) {
            await db.query(
                "DELETE FROM user_holdings WHERE user_id = $1 AND company_symbol = $2",
                [userId, symbol]
            );
        } else {
            const newQty = initialQty - qty;
            await db.query(
                "UPDATE user_holdings SET quantity = $1 WHERE user_id = $2 AND company_symbol = $3",
                [newQty, userId, symbol]
            );
        }

        await db.query(
            "UPDATE users SET balance = balance + $1 WHERE id = $2",
            [totalValue, userId]
        );

        await db.query(
            "INSERT INTO trades(user_id, company_symbol, price, quantity, type) VALUES ($1, $2, $3, $4, $5)",
            [userId, symbol, currPrice, qty, 'sell']
        );

        res.status(200).json({ message: "Sell trade successful and balance updated." });
    } catch (error) {
        console.error("Error processing sell:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/history", isAuthenticated, async (req, res) => {
    const userId = req.user.id;
    try {
        const result = await db.query(
            `SELECT trades.id, trades.company_symbol, companies.name AS company_name, price, quantity, type, timestamp 
            FROM trades 
            INNER JOIN companies 
            ON trades.company_symbol = companies.symbol WHERE trades.user_id = $1 
            ORDER BY trades.timestamp DESC`,
            [userId]
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Error fetching orders" });
    }
});

export default router;
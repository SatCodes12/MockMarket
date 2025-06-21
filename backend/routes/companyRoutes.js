import express from "express";
import db from "../db/index.js";

const router = express.Router();

router.get("/search", async (req, res) => {
    const { query } = req.query;
    if (!query) return res.json([]);

    try {
        const result = await db.query(
            "SELECT symbol, name FROM companies WHERE symbol ILIKE $1 OR name ILIKE $1",
            [`%${query}%`]
        );
        res.json(result.rows);
    } catch (error) {
        console.error("Error in /companies/search:", error);
        res.status(500).json({ error: "Database error" });
    }
});

export default router;
import express from "express";
import axios from "axios";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();

router.get("/", async (req, res) => {
    try {
        const result = await axios.get("https://stock.indianapi.in/news", {
            headers: {
                'X-Api-Key': process.env.API_KEY
            }
        })
        res.json(result.data);
    } catch (error) {
        console.log(error)
        res.status(500).send("Error fetching news");
    }
});

export default router;
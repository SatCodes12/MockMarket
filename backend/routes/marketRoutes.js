import express from "express";
import axios from "axios";
import { spawn } from "child_process";
const router = express.Router();

router.get("/status", async (req, res) => {
  try {
    const response = await axios.get("https://www.nseindia.com/api/marketStatus", {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
        "Referer": "https://www.nseindia.com/"
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching market status:", error.message);
    res.status(500).json({ error: "Failed to fetch market status from NSE" });
  }
});

router.get("/indices", (req, res) => {
    const py = spawn("python", ["./utils/indexData.py"]);

    let data = "";
    py.stdout.on("data", (chunk) => {
        data += chunk.toString();
    });

    py.stderr.on("data", (err) => {
        console.error("Python error:", err.toString());
    });

    py.on("close", () => {
        try {
            const result = JSON.parse(data);
            res.json(result);
        } catch (error) {
            console.log(error)
            res.status(500).send("Error parsing data");
        }
    });
});

router.get("/stock/:symbol", (req, res) => {
    const { symbol } = req.params;
    console.log(symbol);
    const py = spawn("python", ["./utils/stockData.py", symbol]);

    let data = "";
    let errorOutput = "";

    py.stdout.on("data", (chunk) => {
        data += chunk.toString();
    });

    py.stderr.on("data", (err) => {
        errorOutput += err.toString();
    });

    py.on("close", (code) => {
        if (code !== 0 || errorOutput) {
            console.error("Python script error:", errorOutput);
            return res.status(500).send("Internal server error");
        }

        try {
            const result = JSON.parse(data);
            res.json(result);
        } catch (err) {
            console.error("JSON parse error:", err);
            res.status(500).send("Error parsing stock data");
        }
    });
});

router.get("/stock/price/:symbol", (req, res) => {
    const { symbol } = req.params;
    console.log(symbol);
    const py = spawn("python", ["./utils/stockPriceData.py", symbol]);

    let data = "";
    let errorOutput = "";

    py.stdout.on("data", (chunk) => {
        data += chunk.toString();
    });

    py.stderr.on("data", (err) => {
        errorOutput += err.toString();
    });

    py.on("close", (code) => {
        if (code !== 0 || errorOutput) {
            console.error("Python script error:", errorOutput);
            return res.status(500).send("Internal server error");
        }

        try {
            const result = JSON.parse(data);
            res.json(result);
        } catch (err) {
            console.error("JSON parse error:", err);
            res.status(500).send("Error parsing stock data");
        }
    });
});

export default router;
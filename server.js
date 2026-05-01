const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();

// 🔥 IMPORTANT: allow all origins
app.use(cors());

const API_URL = "https://draw.ar-lottery01.com/WinGo/WinGo_1M/GetHistoryIssuePage.json?pageNo=1&pageSize=10";

app.get("/data", async (req, res) => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        let list = data.list || [];

        let numbers = list.map(i => parseInt(i.code));
        let last = numbers[0];

        let prediction = last >= 5 ? "SMALL" : "BIG";

        // 🔥 IMPORTANT headers
        res.setHeader("Access-Control-Allow-Origin", "*");

        res.json({
            results: list,
            prediction: prediction,
            lastNumber: last
        });

    } catch (err) {
        res.status(500).json({ error: "API failed" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));

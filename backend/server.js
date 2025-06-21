import express from "express";
import session from "express-session";
import passport from "passport";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import "./config/passport.js";
import cors from "cors";
import db from "./db/index.js";
import authRoutes from "./routes/authRoutes.js";
import marketRoutes from "./routes/marketRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import holdingRoutes from "./routes/holdingRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
}));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/market", marketRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/holding", holdingRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

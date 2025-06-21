import express from "express";
import passport from "passport";
import { registerUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ error: "Invalid credentials" });

        req.login(user, (err) => {
            if (err) return next(err);
            const { password, ...safeUser } = user;
            return res.json({ user: safeUser });
        });
    })(req, res, next);
});


router.post("/register", registerUser);

router.get("/logout", (req, res) => {
    req.logout(err => {
        if (err) return res.status(500).json({ error: "Logout error" });
        res.json({ message: "Logged out successfully" });
    });
});

router.get("/check", (req, res) => {
    if (req.isAuthenticated()) {
        const { password, ...safeUser } = req.user;
        res.json({ user: safeUser });
    } else {
        res.json({ user: null });
    }
});

export default router;

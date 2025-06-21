import bcrypt from "bcrypt";
import db from "../db/index.js";

const saltRounds = 10;

export const registerUser = async (req, res) => {
    const { name, username, email, password, dob } = req.body;

    try {
        const existingUser = await db.query("SELECT * FROM users WHERE email=$1", [email]);
        if (existingUser.rows.length > 0) return res.redirect("/login");

        const hash = await bcrypt.hash(password, saltRounds);
        const result = await db.query(
            "INSERT INTO users(name, username, email, password, dob) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [name, username, email, hash, dob || null]
        );

        const user = result.rows[0];
        req.login(user, (err) => {
            if (err) return res.status(500).json({ error: "Login after register failed" });

            const { password, ...safeUser } = user;
            res.status(201).json({ user: safeUser });
        });

    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
import db from "../db/index.js";

passport.use("local",
    new Strategy(
        { usernameField: "email" },
        async function verify(email, password, cb) {
            try {
                const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
                if (result.rows.length > 0) {
                    const user = result.rows[0];
                    const storedHashedPassword = user.password;
                    bcrypt.compare(password, storedHashedPassword, (err, valid) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            if (valid) {
                                return cb(null, user);
                            }
                            else {
                                return cb(null, false);
                            }
                        }
                    })
                }
                else {
                    return cb("User not found");
                }
            } catch (error) {
                console.log(error);
            }
        })
);

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((user, cb) => {
    cb(null, user);
});
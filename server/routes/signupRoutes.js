import express from "express";
import db from "../db/connection.js";
import passwordUtils from "../utils/passwordUtils.js";
import { getZodiacSign } from "../utils/zodiacUtils.js";

const router = express.Router();

router.post("/auth/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).send({ error: "All fields are required" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .send({ error: "Password must be at least 6 characters" });
  }

  try {
    const existingUser = await db.get(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email],
    );

    if (existingUser) {
      return res
        .status(409)
        .send({ error: "Username or email already exists" });
    }

    const hashedPassword = await passwordUtils.hashPassword(password);

    const result = await db.run(
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, "user"],
    );

    const newUser = await db.get("SELECT * FROM users WHERE id = ?", [
      result.lastID,
    ]);

    req.session.userId = newUser.id;
    req.session.username = newUser.username;
    req.session.role = newUser.role;

    const zodiacSign = getZodiacSign(newUser.birthdate);

    res.status(201).send({
      message: "Account created successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        birthdate: newUser.birthdate,
        show_zodiac: newUser.show_zodiac,
        zodiacSign: zodiacSign,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).send({ error: "Failed to create account" });
  }
});

export default router;

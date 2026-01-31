import express from "express";
import db from "../db/connection.js";
import passwordUtils from "../utils/passwordUtils.js";
import { getZodiacSign } from "../utils/zodiacUtils.js";

const router = express.Router();

router.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .send({ error: "Username and password are required" });
  }

  try {
    const user = await db.get(
      "SELECT * FROM users WHERE username = ?",
      username,
    );
    console.log(user);

    if (!user) {
      return res.status(401).send({ error: "Invalid username or password" });
    }

    const isValidPassword = await passwordUtils.comparePassword(
      password,
      user.password,
    );

    if (!isValidPassword) {
      return res.status(401).send({ error: "Invalid username or password" });
    }

    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.role = user.role;

    const zodiacSign = getZodiacSign(user.birthdate);

    res.send({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        birthdate: user.birthdate,
        show_zodiac: user.show_zodiac,
        zodiacSign: zodiacSign,
      },
    });
  } catch (error) {
    res.status(500).send({ error: "Login failed" });
  }
});

router.post("/auth/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).send({ error: "Logout failed" });
    }
    res.send({ message: "Logout successful" });
  });
});

router.get("/auth/status", (req, res) => {
  if (req.session.userId) {
    return res.send({
      isAuthenticated: true,
      user: {
        id: req.session.userId,
        username: req.session.username,
        role: req.session.role,
      },
    });
  }
  res.send({ isAuthenticated: false });
});

export default router;

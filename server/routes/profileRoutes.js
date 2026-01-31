import express from "express";
import db from "../db/connection.js";
import passwordUtils from "../utils/passwordUtils.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import { getZodiacSign } from "../utils/zodiacUtils.js";

const router = express.Router();

router.put("/profile/update", isAuthenticated, async (req, res) => {
  const { currentPassword, newPassword, birthdate, showZodiac } = req.body;
  const userId = req.session.userId;

  try {
    const user = await db.get("SELECT * FROM users WHERE id = ?", [userId]);

    if (newPassword) {
      const isValidPassword = await passwordUtils.comparePassword(
        currentPassword,
        user.password,
      );

      if (!isValidPassword) {
        return res.status(401).send({ error: "Current password is incorrect" });
      }

      const hashedPassword = await passwordUtils.hashPassword(newPassword);

      await db.run(
        "UPDATE users SET password = ?, birthdate = ?, show_zodiac = ? WHERE id = ?",
        [hashedPassword, birthdate, showZodiac ? 1 : 0, userId],
      );
    } else {
      await db.run(
        "UPDATE users SET birthdate = ?, show_zodiac = ? WHERE id = ?",
        [birthdate, showZodiac ? 1 : 0, userId],
      );
    }

    const updatedUser = await db.get(
      "SELECT id, username, email, role, birthdate, show_zodiac FROM users WHERE id = ?",
      [userId],
    );

    const zodiacSign = getZodiacSign(updatedUser.birthdate);

    req.session.user = updatedUser;
    req.session.birthdate = updatedUser.birthdate;
    req.session.show_zodiac = updatedUser.show_zodiac;

    res.send({ user: updatedUser, zodiacSign });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).send({ error: "Failed to update profile" });
  }
});

export default router;

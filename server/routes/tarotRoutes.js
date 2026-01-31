import express from "express";
import db from "../db/connection.js";
import { interpretTarotCard } from "../services/aiService.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

function getNextMidnight() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  return tomorrow.toISOString();
}

router.post("/tarot/draw", isAuthenticated, async (req, res) => {
  const { question } = req.body;
  const userId = req.session.userId;

  if (!question) {
    return res.status(400).send({ error: "Question is required" });
  }

  try {
    // Check how many cards drawn today
    const count = await db.get(
      `SELECT COUNT(*) as count FROM readings 
       WHERE user_id = ? AND date(created_at) = date('now')`,
      [userId],
    );

    if (count.count >= 2) {
      return res.status(429).send({
        error: "Daily limit reached",
        limitReached: true,
        resetTime: getNextMidnight(),
      });
    }

    // Draw random card from db. LIMIT gives one result
    const card = await db.get(`
      SELECT * FROM tarot_cards 
      ORDER BY RANDOM()
      LIMIT 1
    `);

    if (!card) {
      return res.status(404).send({ error: "No cards found" });
    }

    // Get AI interpretation
    const interpretation = await interpretTarotCard(
      card.name,
      card.base_meaning,
      question,
    );

    await db.run(
      `INSERT INTO readings (user_id, card_id, question, interpretation) 
       VALUES (?, ?, ?, ?)`,
      [userId, card.id, question, interpretation],
    );

    res.send({
      card: {
        name: card.name,
        imageUrl: card.image_url,
        baseMeaning: card.base_meaning,
      },
      interpretation,
    });
  } catch (error) {
    console.error("Error drawing card:", error);
    res.status(500).send({ error: "Failed to draw card" });
  }
});

router.get("/tarot/latest", isAuthenticated, async (req, res) => {
  const userId = req.session.userId;

  try {
    const reading = await db.get(
      `
      SELECT 
        r.id,
        r.question,
        r.interpretation,
        r.created_at,
        c.name as card_name,
        c.image_url as card_image
      FROM readings r
      JOIN tarot_cards c ON r.card_id = c.id
      WHERE r.user_id = ?
      ORDER BY r.created_at DESC
      LIMIT 1
    `,
      [userId],
    );

    if (!reading) {
      return res.send({ reading: null });
    }

    res.send({ reading });
  } catch (error) {
    console.error("Error fetching latest reading:", error);
    res.status(500).send({ error: "Failed to fetch reading" });
  }
});

export default router;

import express from "express";
import db from "../db/connection.js";
import { interpretTarotCard } from "../services/aiService.js";

const router = express.Router();

router.post("/tarot/draw", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).send({ error: "Question is required" });
  }

  try {
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

export default router;

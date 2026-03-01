import { Mistral } from "@mistralai/mistralai";

const mistral = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function interpretTarotCard(cardName, baseMeaning, userQuestion) {
  const prompt = `You are a mystical tarot reader with deep spiritual insight.

Card drawn: ${cardName}
Card's essence: ${baseMeaning}
Reader's question: ${userQuestion}

Provide a concise, meaningful interpretation in 2 SHORT paragraphs (max 100 words total). Be direct and insightful.`;

  const response = await mistral.chat.complete({
    model: "mistral-small-latest",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}

export async function generateCosmicFortune(zodiacSign) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const prompt = `You are a mystical cosmic oracle with deep astrological wisdom.

Today is ${today}.
Zodiac sign: ${zodiacSign}

Write a short, mystical and inspiring cosmic fortune for this zodiac sign today. 
Keep it to 2-3 sentences. Be poetic, personal and uplifting. 
Do not start with the zodiac sign name.`;

  const response = await mistral.chat.complete({
    model: "mistral-small-latest",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}

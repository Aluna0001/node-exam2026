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
  const today = new Date().toLocaleDateString("da-DK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const prompt = `You are a seasoned astrological expert who provides competent, insightful guidance on zodiac signs, thoughtfully interpreting their well-known stereotypes through informed and symbolic understanding.

Today is ${today}.
Zodiac sign: ${zodiacSign}

Write 2 sentences for today's cosmic fortune for this zodiac sign. Be true to the characteristics and stereotypes of the sign. Do not start with the zodiac sign name.`;

  const response = await mistral.chat.complete({
    model: "mistral-small-latest",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content;
}

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

import { Mistral } from "@mistralai/mistralai";

const mistral = process.env.MISTRAL_API_KEY
  ? new Mistral({
      apiKey: process.env.MISTRAL_API_KEY,
    })
  : null;

export async function interpretTarotCard(cardName, baseMeaning, userQuestion) {
  if (!mistral) {
    // Return mock interpretation when API key is not available
    return `The ${cardName} card emerges, carrying the essence of ${baseMeaning}. In relation to your question about ${userQuestion}, this card suggests introspection and deeper understanding. Trust your intuition as you navigate this path forward.`;
  }

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
  if (!mistral) {
    // Return mock horoscope when API key is not available
    const fortunes = {
      Aries: "Today brings new opportunities for leadership. Channel your natural energy into meaningful projects.",
      Taurus: "Stability and patience are your strengths today. Trust in your steady progress.",
      Gemini: "Communication flourishes today. Share your ideas and connect with others.",
      Cancer: "Nurture your emotional well-being today. Home and family bring comfort.",
      Leo: "Your creative energy shines brightly. Let your authentic self be seen.",
      Virgo: "Attention to detail serves you well today. Organize and refine your plans.",
      Libra: "Balance and harmony are within reach. Trust your instincts about relationships.",
      Scorpio: "Transformation is in the air. Embrace change with confidence.",
      Sagittarius: "Adventure calls to you today. Explore new possibilities.",
      Capricorn: "Ambition meets opportunity. Focus on your long-term goals.",
      Aquarius: "Innovation and vision guide you today. Think outside the box.",
      Pisces: "Intuition is your compass today. Trust your inner wisdom.",
    };

    return (
      fortunes[zodiacSign] ||
      `The cosmic energies align favorably for ${zodiacSign}. Trust in the universe's plan for you.`
    );
  }

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

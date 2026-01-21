import { Mistral } from '@mistralai/mistralai'

const mistral = new Mistral({
  apiKey: process.env.MISTRAL_API_KEY
})

export async function interpretTarotCard (cardName, baseMeaning, userQuestion) {
  const prompt = `You are a mystical tarot reader with deep spiritual insight.

Card drawn: ${cardName}
Card's essence: ${baseMeaning}
Reader's question: ${userQuestion}

Provide a meaningful, personalized interpretation in 2-3 short paragraphs. Be mystical but genuine. Connect the card's meaning to their specific question.`

  const response = await mistral.chat.complete({
    model: 'mistral-small-latest',
    messages: [{ role: 'user', content: prompt }]
  })

  return response.choices[0].message.content
}

import { fetchRequestJson } from "../utils/fetch.js";

export async function drawTarotCard(question) {
  const response = await fetchRequestJson("/tarot/draw", { question }, "POST");

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to draw card");
  }

  return await response.json();
}

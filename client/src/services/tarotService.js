import { fetchGet, fetchRequestJson } from "../utils/fetch.js";

export async function checkDailyLimit() {
  return await fetchGet("/tarot/check-limit");
}

export async function drawTarotCard(question) {
  const response = await fetchRequestJson("/tarot/draw", { question }, "POST");

  if (!response.ok) {
    const error = await response.json();

    if (error.limitReached) {
      return {
        limitReached: true,
        resetTime: error.resetTime,
      };
    }

    throw new Error(error.error || "Failed to draw card");
  }

  return await response.json();
}

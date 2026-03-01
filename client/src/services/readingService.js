import { fetchGet } from "../utils/fetch.js";

export async function getLatestReading() {
  try {
    const data = await fetchGet("/tarot/latest");
    return data.reading;
  } catch (error) {
    console.error("Error fetching latest reading:", error);
    return null;
  }
}

export async function getReadingHistory() {
  try {
    const data = await fetchGet("/tarot/history");
    return data.readings;
  } catch (error) {
    console.error("Error fetching reading history:", error);
    return [];
  }
}

export async function getDailyHoroscope() {
  try {
    const data = await fetchGet("/horoscope/daily");
    return data;
  } catch (error) {
    console.error("Error fetching horoscope:", error);
    return null;
  }
}

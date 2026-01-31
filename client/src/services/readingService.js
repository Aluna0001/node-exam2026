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

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getCampaignUpdates() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Find the latest news and public announcements regarding Marcus Ryan's 2026 campaign as a Democrat for Georgia State House Representative. Summarize in 3 bullet points for a 'Latest News' section.",
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching updates:", error);
    return null;
  }
}

export async function getNearbyOffices(lat: number, lng: number) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find official campaign offices or community centers for Marcus Ryan for Georgia near coordinates ${lat}, ${lng}.`,
      config: {
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: {
              latitude: lat,
              longitude: lng
            }
          }
        }
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching maps data:", error);
    return null;
  }
}

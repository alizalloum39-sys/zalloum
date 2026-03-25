import { GoogleGenAI } from "@google/genai";
import { ScentRecommendation } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function getScentRecommendation(userPreference: string): Promise<ScentRecommendation> {
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `User preference: "${userPreference}"`,
    config: {
      systemInstruction: `You are the 'Zalloum Digital Sommelier.' Your goal is to convert visitors by reducing the 'Blind-Buy' anxiety of perfume shopping.
      
      Logic: Map inputs to the Zalloum collection (Oud, Musk, Floral, Oriental).
      Output: Return a JSON object containing:
      - recommendedScent: string
      - emotionalWhy: string (Sophisticated, poetic, and authoritative storytelling copy)
      - sillageLevel: number (1-5)
      - trialVialLink: string (Link to a 2ml Trial Vial)
      
      Tone: Sophisticated, poetic, and authoritative.`,
      responseMimeType: "application/json",
    },
  });

  try {
    return JSON.parse(response.text || "{}") as ScentRecommendation;
  } catch (e) {
    console.error("Failed to parse AI response", e);
    throw new Error("Could not generate recommendation");
  }
}

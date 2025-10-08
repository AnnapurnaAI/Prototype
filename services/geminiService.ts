
import { GoogleGenAI, Type } from "@google/genai";
import type { NutrientInfo } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a placeholder for environments where the key is not set.
  // In a real deployed app, this would be handled by the hosting environment.
  console.warn("API_KEY environment variable not set. Using a placeholder.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY || 'MISSING_API_KEY' });

export const getNutrientInfoForMeal = async (mealDescription: string): Promise<NutrientInfo> => {
    if (!API_KEY || API_KEY === 'MISSING_API_KEY') {
        console.log("Using mock nutrient data because API key is missing.");
        return {
            calories: Math.floor(Math.random() * 300) + 200,
            protein: Math.floor(Math.random() * 20) + 10,
            carbs: Math.floor(Math.random() * 40) + 20,
            fat: Math.floor(Math.random() * 15) + 5,
        };
    }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following Indian meal and provide an estimated nutritional breakdown. Meal: "${mealDescription}"`,
      config: {
        systemInstruction: "You are a helpful nutrition assistant specializing in Indian cuisine. Provide a reasonable estimate for the nutritional content of the described meal. Respond only with a valid JSON object.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            calories: { type: Type.NUMBER, description: "Estimated total calories." },
            protein: { type: Type.NUMBER, description: "Estimated protein in grams." },
            carbs: { type: Type.NUMBER, description: "Estimated carbohydrates in grams." },
            fat: { type: Type.NUMBER, description: "Estimated fat in grams." },
          },
          required: ["calories", "protein", "carbs", "fat"],
        },
      },
    });

    const jsonString = response.text.trim();
    const nutrientData = JSON.parse(jsonString);

    return {
      calories: nutrientData.calories || 0,
      protein: nutrientData.protein || 0,
      carbs: nutrientData.carbs || 0,
      fat: nutrientData.fat || 0,
    };
  } catch (error) {
    console.error("Error fetching nutrient info from Gemini API:", error);
    // Fallback to mock data on API error
    return {
        calories: 250,
        protein: 15,
        carbs: 30,
        fat: 8,
    };
  }
};

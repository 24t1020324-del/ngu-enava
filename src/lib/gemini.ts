/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function askGemini(prompt: string, context?: string) {
  const fullPrompt = context 
    ? `Context about current Java learning status:\n${context}\n\nUser Question: ${prompt}`
    : prompt;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: fullPrompt,
      config: {
        systemInstruction: "You are a senior Java architect and tutor. Help the user consolidate their knowledge from the Roadmap and their personal notes. Keep answers concise but deep.",
      }
    });

    return response.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error communicating with Gemini. Please check your API key.";
  }
}


import { GoogleGenAI, Type } from "@google/genai";
import type { SentimentAnalysisResult } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const analyzeSentiment = async (transcript: string): Promise<SentimentAnalysisResult> => {
  const prompt = `
    Analyze the sentiment of the following meeting transcript. Provide a detailed analysis in JSON format.
    The JSON object must adhere to the provided schema.

    The analysis should include:
    1. "overallSentiment": A single string, either "POSITIVE", "NEGATIVE", "NEUTRAL", or "MIXED".
    2. "summary": A concise, one-paragraph summary of the meeting's emotional tone and key sentiment drivers.
    3. "keyPoints": An array of objects, where each object represents a significant moment or topic. Each object must have "text" (a quote or summary of the point) and "sentiment" ("POSITIVE", "NEGATIVE", or "NEUTRAL").
    4. "sentimentScores": An object with numerical scores from 0 to 100 for "positive", "negative", and "neutral", representing the percentage of the conversation that falls into each category. The scores must sum to 100.

    Transcript:
    ---
    ${transcript}
    ---
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overallSentiment: { type: Type.STRING, enum: ["POSITIVE", "NEGATIVE", "NEUTRAL", "MIXED"] },
            summary: { type: Type.STRING },
            keyPoints: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  text: { type: Type.STRING },
                  sentiment: { type: Type.STRING, enum: ["POSITIVE", "NEGATIVE", "NEUTRAL"] }
                },
                required: ["text", "sentiment"]
              }
            },
            sentimentScores: {
              type: Type.OBJECT,
              properties: {
                positive: { type: Type.INTEGER },
                negative: { type: Type.INTEGER },
                neutral: { type: Type.INTEGER }
              },
              required: ["positive", "negative", "neutral"]
            }
          },
          required: ["overallSentiment", "summary", "keyPoints", "sentimentScores"]
        }
      }
    });

    const jsonString = response.text.trim();
    const result: SentimentAnalysisResult = JSON.parse(jsonString);
    
    // Basic validation to ensure scores sum to 100
    const { positive, negative, neutral } = result.sentimentScores;
    if (positive + negative + neutral !== 100) {
      console.warn("Sentiment scores do not sum to 100.", result.sentimentScores);
      // Optional: Normalize scores if they don't sum to 100, though with schema this is less likely.
    }

    return result;

  } catch (error) {
    console.error("Error analyzing sentiment with Gemini API:", error);
    throw new Error("Failed to analyze sentiment. Please check the console for more details.");
  }
};

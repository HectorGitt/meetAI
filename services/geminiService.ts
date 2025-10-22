
import { GoogleGenAI, Type } from "@google/genai";
import type { SentimentAnalysisResult, WorkforceAnalysisResult } from '../types';

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

export const analyzeWorkforce = async (transcript: string, participants: string[]): Promise<WorkforceAnalysisResult> => {
  const prompt = `
    Analyze the following meeting transcript to determine speaker contributions for the provided list of participants.

    Your task is to:
    1. Identify each time a participant from the list speaks.
    2. Count the number of speaking turns for each participant.
    3. Count the total number of words spoken by each participant.

    The final output MUST be a valid JSON object that adheres to the provided schema.
    The keys in the 'speakingTurns' and 'wordCountPerParticipant' objects must be the names of the participants.
    If a participant from the list does not speak, their value should be 0.

    Participants: ${participants.join(', ')}

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
            speakingTurns: {
              type: Type.OBJECT,
              properties: participants.reduce((acc, name) => ({ ...acc, [name]: { type: Type.INTEGER } }), {})
            },
            wordCountPerParticipant: {
              type: Type.OBJECT,
              properties: participants.reduce((acc, name) => ({ ...acc, [name]: { type: Type.INTEGER } }), {})
            }
          },
          required: ["speakingTurns", "wordCountPerParticipant"]
        }
      }
    });

    const jsonString = response.text.trim();
    const result: WorkforceAnalysisResult = JSON.parse(jsonString);

    // Ensure all participants are in the result, even if they didn't speak
    for (const participant of participants) {
      if (!(participant in result.speakingTurns)) {
        result.speakingTurns[participant] = 0;
      }
      if (!(participant in result.wordCountPerParticipant)) {
        result.wordCountPerParticipant[participant] = 0;
      }
    }

    return result;

  } catch (error) {
    console.error("Error analyzing workforce data with Gemini API:", error);
    throw new Error("Failed to analyze workforce data. Please check the console for more details.");
  }
};

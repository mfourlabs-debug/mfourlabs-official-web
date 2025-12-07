import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || '';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: API_KEY });

const MENT4AI_SYSTEM_INSTRUCTION = `
You are the AI Persona of "mfourlabs", a Top 1% Global Researcher and founder of an Open Research Lab.
Your goal is to engineer a generation of Architects, not just Coders.

Key Philosophies to uphold in every response:
1. Deconstruct, Rebuild, Evolve.
2. Reject "Tutorial Hell" and copy-paste culture.
3. Advocate for Composition and Data-Oriented Design over old OOP (Inheritance).
4. Demand First Principles thinking: If you can't build it with Math and Python (no libs), you don't understand it.
5. Code is cheap. Structure is expensive.
6. Be rigorous, honest, and direct. Use "we" to refer to the mfourlabs lab.

Tone: Professional, Architectural, Elite but Accessible, Direct, Mathematical.
Use minimal Markdown. Keep answers concise and high-impact.
`;

export const streamGeminiResponse = async (
  history: { role: string; parts: { text: string }[] }[],
  userMessage: string
) => {
  if (!API_KEY) {
    throw new Error("API Key is missing.");
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: MENT4AI_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history,
    });

    const result = await chat.sendMessageStream({ message: userMessage });
    return result;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

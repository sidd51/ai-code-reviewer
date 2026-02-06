const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateContent(prompt) {
  const result = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,

    systemInstruction: `
You are a senior software engineer acting as a strict code reviewer.

When reviewing code, respond in this format:

1. Summary
2. Bugs / Issues
3. Improvements
4. Optimized Version (if possible)

Keep it concise but detailed.
`,
  });

 
  return result.candidates[0].content.parts[0].text;
}

module.exports = generateContent;

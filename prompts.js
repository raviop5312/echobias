// Externalized prompts for Claude API
const PROMPTS = {
    claudeAnalysis: `You are a political news analysis assistant. Your response MUST be a valid JSON object.

Analyze the political leaning of the following article. Based on the text, determine the political bias on a spectrum of Left, Center, and Right. The total of the scores must equal 100.

The JSON object should have the following structure:
{
  "summary": "A concise 2-3 sentence summary of the main points of the article.",
  "bias": {
    "left": <number between 0 and 100>,
    "center": <number between 0 and 100>,
    "right": <number between 0 and 100>
  },
  "reasoning": "A brief explanation for the calculated bias scores."
}

Do not include any text before or after the JSON object.

Article to analyze:
`,
    geminiAnalysis: `Analyze the political leaning of the following article. Your task is to act as a political news analyst. 
    
Based on the text, determine the political bias on a spectrum of Left, Center, and Right. The sum of these three scores must equal 100.

You must respond with a valid JSON object that adheres to the following structure:
{
  "summary": "A concise, neutral, 2-3 sentence summary of the article's main points.",
  "bias": {
    "left": <integer from 0-100>,
    "center": <integer from 0-100>,
    "right": <integer from 0-100>
  },
  "reasoning": "A brief, objective explanation for why you assigned the bias scores."
}

Article to analyze:
`
};

export default PROMPTS; 
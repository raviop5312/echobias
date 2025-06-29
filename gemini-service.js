// Gemini API service for article analysis
import PROMPTS from './prompts.js';
import CONFIG from './config.js';
import { GEMINI_API_KEY } from './keys.js';

class GeminiService {
    constructor() {
        this.apiKey = GEMINI_API_KEY;
        this.baseUrl = `https://generativelanguage.googleapis.com/v1beta/models/${CONFIG.GEMINI_MODEL}:generateContent`;
    }

    async analyzeArticle(articleData) {
        if (!this.apiKey || this.apiKey === 'your-gemini-api-key-here') {
            return {
                success: false,
                error: 'Gemini API key is not configured in keys.js'
            };
        }

        try {
            const prompt = PROMPTS.geminiAnalysis + this.formatArticleForGemini(articleData);

            const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        response_mime_type: "application/json",
                    }
                })
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error('Gemini API Error Body:', errorBody);
                throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const analysisText = data.candidates[0].content.parts[0].text;
            const analysisJSON = JSON.parse(analysisText);

            return {
                success: true,
                analysis: analysisJSON,
            };

        } catch (error) {
            console.error('Error calling Gemini API or parsing JSON:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    formatArticleForGemini(articleData) {
        return `
TITLE: ${articleData.title}
URL: ${articleData.url}
AUTHOR: ${articleData.author}
SITE: ${articleData.site}
DESCRIPTION: ${articleData.description}

FULL CONTENT:
${articleData.content}
        `.trim();
    }
}

export default GeminiService; 
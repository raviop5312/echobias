// Claude API service for article analysis
import PROMPTS from './prompts.js';
import CONFIG from './config.js';
import { CLAUDE_API_KEY } from './keys.js';

class ClaudeService {
    constructor() {
        this.apiKey = CLAUDE_API_KEY;
        this.baseUrl = 'https://api.anthropic.com/v1/messages';
    }

    async analyzeArticle(articleData) {
        if (!this.apiKey || this.apiKey === 'your-claude-api-key-here') {
            return {
                success: false,
                error: 'Claude API key is not configured in keys.js'
            };
        }

        try {
            const prompt = PROMPTS.claudeAnalysis + this.formatArticleForClaude(articleData);
            
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': this.apiKey,
                    'anthropic-version': '2023-06-01'
                },
                body: JSON.stringify({
                    model: CONFIG.CLAUDE_MODEL,
                    max_tokens: CONFIG.CLAUDE_MAX_TOKENS,
                    messages: [
                        {
                            role: 'user',
                            content: prompt
                        }
                    ]
                })
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error('Claude API Error Body:', errorBody);
                throw new Error(`Claude API error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            const analysisText = data.content[0].text;
            const analysisJSON = JSON.parse(analysisText);
            
            return {
                success: true,
                analysis: analysisJSON,
                usage: data.usage
            };

        } catch (error) {
            console.error('Error calling Claude API or parsing JSON:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    formatArticleForClaude(articleData) {
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

export default ClaudeService; 
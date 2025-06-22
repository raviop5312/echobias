// Example configuration file - Copy this to config.js and add your API key
// IMPORTANT: Never commit your actual config.js file with real API keys

const CONFIG = {
    // Claude API Configuration
    CLAUDE_API_KEY: 'YOUR_CLAUDE_API_KEY_HERE', // Replace with your actual API key from https://console.anthropic.com/
    
    // Gemini API Configuration
    GEMINI_API_KEY: 'YOUR_GEMINI_API_KEY_HERE', // Replace with your actual API key from https://aistudio.google.com/app/apikey

    // API Settings
    CLAUDE_MODEL: 'claude-3-sonnet-20240229',
    GEMINI_MODEL: 'gemini-2.0-flash',
    CLAUDE_MAX_TOKENS: 1000,
    
    // Extension Settings
    EXTRACTION_DELAY: 1000, // milliseconds
    ANALYSIS_TIMEOUT: 30000 // milliseconds
};

export default CONFIG; 
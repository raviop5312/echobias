// Configuration file for API keys and settings
// IMPORTANT: Add this file to .gitignore to prevent committing sensitive data

const CONFIG = {
    // Claude API Configuration
    CLAUDE_API_KEY: 'YOUR_CLAUDE_API_KEY_HERE', // Replace with your actual API key
    
    // Gemini API Configuration
    GEMINI_API_KEY: '', // Replace with your actual API key, please ensure you do not push key to public repositories
    
    // API Settings
    CLAUDE_MODEL: 'claude-3-sonnet-20240229',
    GEMINI_MODEL: 'gemini-2.0-flash',
    CLAUDE_MAX_TOKENS: 1000,
    
    // Extension Settings
    EXTRACTION_DELAY: 1000, // milliseconds
    ANALYSIS_TIMEOUT: 30000 // milliseconds
};

export default CONFIG; 
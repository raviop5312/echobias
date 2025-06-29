# EchoBias : News Scanner & AI Analyzer

This is a Chrome extension that analyzes the political bias of news articles using AI. It extracts the content from a web page and sends it to either Google's Gemini or Anthropic's Claude to get a political leaning score (Left, Center, Right) and a summary.

![Screenshot of the extension popup showing a political bias analysis bar](https://i.imgur.com/your-screenshot-url.png) <!-- Replace with your screenshot URL -->

## Features

*   **Article Extraction**: Uses Mozilla's Readability.js to intelligently extract the main article content from any news page.
*   **AI-Powered Analysis**: Sends the extracted text to a large language model (LLM) for analysis.
*   **Dual Model Support**: Choose between Google Gemini or Anthropic Claude for the analysis.
*   **Visual Feedback**: Displays the political bias score in an easy-to-read bar graph with overlay on the web page.
*   **Detailed Summary**: Provides a summary and reasoning for the bias score provided by the AI.
*   **Page Overlay**: Shows bias analysis directly on the web page with a draggable overlay.

## Setup Instructions

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **⚠️ IMPORTANT: Create API Keys File**:
    You **must** create a `keys.js` file in the root directory with your API keys. This file is ignored by Git for security.
    
    Create a new file called `keys.js` and add the following content:
    ```javascript
    // API Keys Configuration
    // DO NOT COMMIT THIS FILE TO VERSION CONTROL

    // Alternative individual exports if preferred
    export const CLAUDE_API_KEY = 'your-claude-api-key-here';
    export const GEMINI_API_KEY = 'your-gemini-api-key-here';
    ```

3.  **Get Your API Keys**:
    - **For Google Gemini**: Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)
    - **For Anthropic Claude**: Get your API key from [Anthropic's Console](https://console.anthropic.com/)
    
    Replace the placeholder values in `keys.js`:
    ```javascript
    export const CLAUDE_API_KEY = '';
    export const GEMINI_API_KEY = '';
    ```

4.  **Load the Extension in Chrome**:
    *   Open Chrome and navigate to `chrome://extensions`.
    *   Enable "Developer mode" in the top right corner.
    *   Click "Load unpacked".
    *   Select the directory where you cloned the repository.

## Usage

1.  Navigate to a news article you want to analyze.
2.  Click the extension icon in your Chrome toolbar.
3.  Select the AI model you want to use (Gemini or Claude).
4.  Click the "Ready to Scan" button.
5.  View the analysis results in the popup **and** as an overlay on the web page.
6.  The overlay can be dragged around and closed with the × button.

## File Structure

```
├── manifest.json          # Chrome extension manifest
├── popup.html            # Extension popup interface
├── popup.js              # Popup logic and UI handling
├── content.js            # Content script for article extraction and overlay
├── background.js         # Service worker for background tasks
├── claude-service.js     # Claude API integration
├── gemini-service.js     # Gemini API integration
├── prompts.js           # AI prompts for analysis
├── config.js            # Extension configuration
├── keys.js              # API keys (YOU MUST CREATE THIS)
├── overlay-styles.css   # Styles for the web page overlay
├── Readability.js       # Mozilla's article extraction library
└── README.md           # This file
```

## Security Notes

- The `keys.js` file is automatically ignored by Git (listed in `.gitignore`)
- Never commit your API keys to version control
- Your API keys are only used locally in your browser
- No data is sent to any servers other than the official AI service APIs

## Troubleshooting

**Extension not working?**
- Make sure you've created the `keys.js` file with valid API keys
- Check the browser console for any error messages
- Ensure you have the correct API key format for each service

**Overlay not appearing?**
- The overlay appears automatically after analysis is complete
- Check if the page has content that can be analyzed
- Try refreshing the page and running the analysis again

## Acknowledgements

This project utilizes Mozilla's **Readability.js** library to extract article content from web pages. Readability.js is a fantastic tool that is the core of the content extraction feature.

*   **Library**: [Readability.js](https://github.com/mozilla/readability)
*   **License**: Apache License 2.0

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for details. 


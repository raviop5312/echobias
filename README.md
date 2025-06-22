# News Scanner & AI Analyzer

This is a Chrome extension that analyzes the political bias of news articles using AI. It extracts the content from a web page and sends it to either Google's Gemini or Anthropic's Claude to get a political leaning score (Left, Center, Right) and a summary.

![Screenshot of the extension popup showing a political bias analysis bar](https://i.imgur.com/your-screenshot-url.png) <!-- Replace with your screenshot URL -->

## Features

*   **Article Extraction**: Uses Mozilla's Readability.js to intelligently extract the main article content from any news page.
*   **AI-Powered Analysis**: Sends the extracted text to a large language model (LLM) for analysis.
*   **Dual Model Support**: Choose between Google Gemini or Anthropic Claude for the analysis.
*   **Visual Feedback**: Displays the political bias score in an easy-to-read bar graph.
*   **Detailed Summary**: Provides a summary and reasoning for the bias score provided by the AI.

## Setup Instructions

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2.  **Create Configuration File**:
    Copy the example config file to create your own local configuration.
    ```bash
    cp config.example.js config.js
    ```

3.  **Add API Keys**:
    Open `config.js` and add your API keys for Google Gemini and/or Anthropic Claude.
    - Get a Gemini key from [Google AI Studio](https://aistudio.google.com/app/apikey).
    - Get a Claude key from [Anthropic's Console](https://console.anthropic.com/).

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
5.  View the analysis results in the popup.

## Acknowledgements

This project utilizes Mozilla's **Readability.js** library to extract article content from web pages. Readability.js is a fantastic tool that is the core of the content extraction feature.

*   **Library**: [Readability.js](https://github.com/mozilla/readability)
*   **License**: Apache License 2.0

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for details. 
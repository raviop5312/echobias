// Popup script for News Scanner Extension
import ClaudeService from './claude-service.js';
import GeminiService from './gemini-service.js';

document.addEventListener('DOMContentLoaded', function() {
    console.log("Popup Loaded");
    
    const scanBtn = document.getElementById('scanBtn');
    const statusDiv = document.getElementById('status');
    const biasBarDiv = document.getElementById('biasBar');
    const analysisDetailsDiv = document.getElementById('analysis-details');
    const modelSelector = document.getElementById('ai-model');
    
    scanBtn.addEventListener('click', async function() {
        try {
            // Reset UI
            statusDiv.textContent = 'Scanning page...';
            biasBarDiv.innerHTML = '';
            analysisDetailsDiv.innerHTML = '';
            scanBtn.disabled = true;
            
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            const articleData = await chrome.tabs.sendMessage(tab.id, { action: "extract_article" });
            
            if (!articleData || !articleData.success) {
                statusDiv.textContent = 'No article found on this page.';
                scanBtn.disabled = false;
                return;
            }
            
            const selectedModel = modelSelector.value;
            statusDiv.textContent = `Analyzing with ${selectedModel.charAt(0).toUpperCase() + selectedModel.slice(1)}...`;
            
            let service;
            if (selectedModel === 'gemini') {
                service = new GeminiService();
            } else {
                service = new ClaudeService();
            }

            const result = await service.analyzeArticle({
                title: articleData.title,
                url: tab.url,
                author: articleData.author,
                site: articleData.site,
                description: articleData.description,
                content: articleData.content
            });
            
            if (result.success && result.analysis.bias) {
                statusDiv.textContent = 'Analysis Complete!';
                renderBiasBar(result.analysis.bias);
                renderAnalysisDetails(result.analysis);
            } else {
                statusDiv.textContent = `Analysis failed: ${result.error || 'Invalid response from AI.'}`;
            }
            
        } catch (error) {
            console.error('Error during scan:', error);
            statusDiv.textContent = `Error: ${error.message}`;
        } finally {
            scanBtn.disabled = false;
        }
    });

    function renderBiasBar(bias) {
        biasBarDiv.innerHTML = `
            <div class="bias-left" style="width: ${bias.left}%" title="Left: ${bias.left}%">${bias.left > 10 ? `L ${bias.left}%` : ''}</div>
            <div class="bias-center" style="width: ${bias.center}%" title="Center: ${bias.center}%">${bias.center > 10 ? `Center ${bias.center}%` : ''}</div>
            <div class="bias-right" style="width: ${bias.right}%" title="Right: ${bias.right}%">${bias.right > 10 ? `R ${bias.right}%` : ''}</div>
        `;
    }

    function renderAnalysisDetails(analysis) {
        analysisDetailsDiv.innerHTML = `
            <h4>Summary</h4>
            <p>${analysis.summary.replace(/\n/g, '<br>')}</p>
            <h4>Reasoning</h4>
            <p>${analysis.reasoning.replace(/\n/g, '<br>')}</p>
        `;
    }
});

// Function to extract article data from the page
function extractArticleData() {
    try {
        const reader = new Readability(document.cloneNode(true));
        const article = reader.parse();
        
        if (article) {
            return {
                success: true,
                title: article.title,
                author: article.byline || 'Unknown',
                site: article.siteName || window.location.hostname,
                description: article.excerpt || 'No description available',
                content: article.textContent
            };
        } else {
            return { success: false, error: 'No article found' };
        }
    } catch (error) {
        return { success: false, error: error.message };
    }
}


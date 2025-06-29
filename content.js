// Readability-based article extractor
console.log('🚀 Readability Article Extractor loaded on:', window.location.href);

// Function to inject CSS for overlay
function injectOverlayCSS() {
    // Check if CSS is already injected
    if (document.getElementById('news-bias-overlay-styles')) {
        return;
    }

    const link = document.createElement('link');
    link.id = 'news-bias-overlay-styles';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = chrome.runtime.getURL('overlay-styles.css');
    document.head.appendChild(link);
}

// Function to extract and log article
function extractArticle() {
    console.log("===============");
    try {
        const reader = new Readability(document.cloneNode(true));
        const article = reader.parse();
        
        if (article) {
            console.log('✅ Article extracted successfully!');
            console.log('📰 Title:', article.title);
            console.log('📝 Description/Excerpt:', article.excerpt || 'No description available');
            console.log('👤 Author:', article.byline || 'Unknown');
            console.log('🌐 Site:', article.siteName || window.location.hostname);
            console.log('📊 Content Length:', article.textContent.length, 'characters');
            console.log('🔗 URL:', window.location.href);
            console.log('📄 Full Article Content:');
            console.log('----------------------------------------');
            console.log(article.textContent);
            console.log('----------------------------------------');
            
            return {
                success: true,
                title: article.title,
                author: article.byline || 'Unknown',
                site: article.siteName || window.location.hostname,
                description: article.excerpt || 'No description available',
                content: article.textContent,
                url: window.location.href
            };
        } else {
            console.log('❌ No article found on this page');
            return { success: false, error: 'No article found' };
        }
    } catch (error) {
        console.error('❌ Error extracting article:', error);
        return { success: false, error: error.message };
    }
}

// Function to create and show bias overlay on the page
function createBiasOverlay(biasData) {
    // Inject CSS first
    injectOverlayCSS();

    // Remove existing overlay if it exists
    const existingOverlay = document.getElementById('news-bias-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }

    // Create overlay container
    const overlay = document.createElement('div');
    overlay.id = 'news-bias-overlay';
    overlay.className = 'animate-in';

    // Create header
    const header = document.createElement('div');
    header.className = 'overlay-header';
    header.innerHTML = `
        <span>📊 Bias Analysis</span>
        <button class="close-button" id="close-bias-overlay">×</button>
    `;

    // Create content area
    const content = document.createElement('div');
    content.className = 'overlay-content';

    // Add summary if available
    if (biasData.summary) {
        const summaryDiv = document.createElement('div');
        summaryDiv.className = 'summary-text';
        summaryDiv.textContent = biasData.summary.substring(0, 150) + (biasData.summary.length > 150 ? '...' : '');
        content.appendChild(summaryDiv);
    }

    // Create bias bar
    const biasBar = document.createElement('div');
    biasBar.className = 'bias-bar';

    const leftSection = document.createElement('div');
    leftSection.className = 'bias-left';
    leftSection.style.width = `${biasData.left}%`;
    leftSection.textContent = biasData.left > 10 ? `L ${biasData.left}%` : '';

    const centerSection = document.createElement('div');
    centerSection.className = 'bias-center';
    centerSection.style.width = `${biasData.center}%`;
    centerSection.textContent = biasData.center > 10 ? `C ${biasData.center}%` : '';

    const rightSection = document.createElement('div');
    rightSection.className = 'bias-right';
    rightSection.style.width = `${biasData.right}%`;
    rightSection.textContent = biasData.right > 10 ? `R ${biasData.right}%` : '';

    biasBar.appendChild(leftSection);
    biasBar.appendChild(centerSection);
    biasBar.appendChild(rightSection);

    content.appendChild(biasBar);

    // Assemble overlay
    overlay.appendChild(header);
    overlay.appendChild(content);

    // Add to page
    document.body.appendChild(overlay);

    // Add close functionality
    document.getElementById('close-bias-overlay').addEventListener('click', () => {
        overlay.remove();
    });

    // Auto-fade after 10 seconds
    setTimeout(() => {
        if (document.getElementById('news-bias-overlay')) {
            overlay.style.opacity = '0.7';
        }
    }, 10000);

    // Make draggable
    let isDragging = false;
    let dragOffset = { x: 0, y: 0 };

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragOffset.x = e.clientX - overlay.offsetLeft;
        dragOffset.y = e.clientY - overlay.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            overlay.style.left = (e.clientX - dragOffset.x) + 'px';
            overlay.style.top = (e.clientY - dragOffset.y) + 'px';
            overlay.style.right = 'auto';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

// Listen for messages from popup to trigger extraction
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "extract_article") {
        console.log('📡 Received extract request from popup');
        const result = extractArticle();
        sendResponse(result);
    } else if (request.action === "show_bias_overlay") {
        console.log('📡 Received show overlay request');
        createBiasOverlay(request.biasData);
        sendResponse({ success: true });
    }
});

// Try multiple triggers to ensure it works on page load
window.addEventListener('load', function() {
    setTimeout(extractArticle, 1000);
});

// Fallback: also try when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(extractArticle, 1000);
    });
} else {
    // DOM is already ready
    setTimeout(extractArticle, 1000);
}

// Additional fallback: try after a longer delay
setTimeout(extractArticle, 3000);
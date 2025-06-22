// Readability-based article extractor
console.log('🚀 Readability Article Extractor loaded on:', window.location.href);

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
                content: article.textContent
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

// Listen for messages from popup to trigger extraction
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "extract_article") {
        console.log('📡 Received extract request from popup');
        const result = extractArticle();
        sendResponse(result);
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
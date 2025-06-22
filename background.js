// Background service worker for News Scanner Extension
console.log('News Scanner Extension background script loaded!');

// Handle extension installation
chrome.runtime.onInstalled.addListener(function(details) {
    console.log('News Scanner Extension installed:', details.reason);
    
    // Set default values
    chrome.storage.local.set({
        installDate: new Date().toISOString(),
        totalNewsExtracted: 0
    });
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'news_extracted') {
        console.log('📰 News content extracted from:', request.data.hostname);
        console.log('News data:', request.data);
        
        // Store the latest news data
        chrome.storage.local.set({
            lastNewsData: request.data,
            [`news_${Date.now()}`]: request.data
        });
        
        // Update counter
        chrome.storage.local.get(['totalNewsExtracted'], function(result) {
            const count = (result.totalNewsExtracted || 0) + 1;
            chrome.storage.local.set({totalNewsExtracted: count});
        });
        
        // Notify popup if it's open
        chrome.runtime.sendMessage({
            action: 'news_update',
            data: request.data
        });
        
        // Update badge with news count
        chrome.action.setBadgeText({
            text: '📰',
            tabId: sender.tab.id
        });
        chrome.action.setBadgeBackgroundColor({color: '#28a745'});
    }
});

// Handle tab updates - scan new pages automatically
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.url) {
        // Reset badge for new page
        chrome.action.setBadgeText({
            text: '',
            tabId: tabId
        });
        
        console.log('Tab updated, news scanner will check:', tab.url);
    }
});

// Handle browser action click
chrome.action.onClicked.addListener(function(tab) {
    console.log('News scanner icon clicked on:', tab.url);
});

// Clean up old news data (keep only last 50 entries)
chrome.storage.local.get(null, function(items) {
    const newsKeys = Object.keys(items).filter(key => key.startsWith('news_'));
    if (newsKeys.length > 50) {
        // Sort by timestamp and remove oldest
        newsKeys.sort();
        const toRemove = newsKeys.slice(0, newsKeys.length - 50);
        chrome.storage.local.remove(toRemove);
    }
});
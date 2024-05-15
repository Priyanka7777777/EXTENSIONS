// Define categories and their corresponding patterns
const categories = {
    "Social Media": ["facebook.com", "twitter.com", "instagram.com"],
    "News": ["bbc.com", "cnn.com", "nytimes.com"],
    "Productivity": ["stackoverflow.com", "github.com", "trello.com"]
};

// Track website visits
chrome.webNavigation.onBeforeNavigate.addListener(function(details) {
    const startTime = new Date().getTime(); // Start time of visit
    const url = new URL(details.url);
    let category = "Other"; // Default category

    // Match URL against category patterns
    for (const [cat, patterns] of Object.entries(categories)) {
        for (const pattern of patterns) {
            if (url.hostname.includes(pattern)) {
                category = cat;
                break;
            }
        }
    }

    // Listen for navigation completion to calculate duration
    chrome.webNavigation.onCompleted.addListener(function(details) {
        const endTime = new Date().getTime(); // End time of visit
        const duration = endTime - startTime; // Duration of visit in milliseconds

        // Send data to background script for storage or further processing
        chrome.runtime.sendMessage({
            action: "trackVisit",
            url: details.url,
            category: category,
            duration: duration
        });
    }, {url: [{hostEquals: url.hostname}]});
});

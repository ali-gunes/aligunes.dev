function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Dark Mode Toggle Functionality
function toggleTheme() {
    const body = document.body;
    const root = document.documentElement;
    
    // Toggle dark mode class on body
    body.classList.toggle('dark-mode');
    root.classList.toggle('dark-mode');
    
    // Save preference to local storage
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
}

// Apply saved theme preference
function loadThemePreference() {
    const savedTheme = localStorage.getItem('darkMode');
    
    // If user has a saved preference, use it
    if (savedTheme !== null) {
        const isDarkMode = savedTheme === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            document.documentElement.classList.add('dark-mode');
        }
    }
    // Otherwise, default to light mode (no need to do anything as light mode is default)
}

// Quotes array
const quotes = [
    "Çok canım sıkılıyor, kuş vuralım istersen",
    "Her isyan deneyim",
    "Zorba sistem hürriyeti aldı zorla bizden",
    "Şol zulümden çıkar yol, mevcudiyet kavgası"
];

// Function to display a random quote
function displayRandomQuote() {
    const quoteElement = document.getElementById('random-quote');
    if (quoteElement) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteElement.textContent = quotes[randomIndex];
    }
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Load theme preference
    loadThemePreference();
    
    // Display random quote
    displayRandomQuote();
    
    // Add event listeners to theme toggle buttons
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }
    
    // Visitor counter logic using a more reliable approach
    const visitorCountElement = document.getElementById('visitorCount');
    
    // Show loading state
    if (visitorCountElement) {
        visitorCountElement.textContent = "...";
    }

    // Function to handle visitor counting with fallback
    const updateVisitorCount = () => {
        // Check if we have a stored count as fallback
        let localCount = localStorage.getItem('visitorCount') || '0';
        localCount = parseInt(localCount, 10);
        
        // For testing locally, we'll use a different namespace to avoid affecting the real counter
        // When deployed to aligunes.dev, this will use the real counter
        const namespace = window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1') 
            ? 'aligunes.dev.test' 
            : 'aligunes.dev';
            
        // Try to use the CountAPI service first
        // The 'hit' endpoint increases the counter for new visitors
        // The 'get' endpoint just retrieves the current count
        const apiUrl = !sessionStorage.getItem('visited') 
            ? `https://api.countapi.xyz/hit/${namespace}/visits` 
            : `https://api.countapi.xyz/get/${namespace}/visits`;
            
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (visitorCountElement && data && data.value) {
                    // Use the API count
                    visitorCountElement.textContent = data.value.toLocaleString();
                    
                    // Store the count locally as fallback
                    localStorage.setItem('visitorCount', data.value);
                    
                    // Mark as visited for this session
                    sessionStorage.setItem('visited', 'true');
                } else {
                    throw new Error('Invalid data from API');
                }
            })
            .catch(error => {
                console.error('Error with visitor count API:', error);
                
                // Fallback to local counting if API fails
                if (!sessionStorage.getItem('visited')) {
                    localCount++;
                    localStorage.setItem('visitorCount', localCount);
                    sessionStorage.setItem('visited', 'true');
                }
                
                if (visitorCountElement) {
                    visitorCountElement.textContent = localCount.toLocaleString();
                }
            });
    };
    
    // Update the visitor count
    updateVisitorCount();
});

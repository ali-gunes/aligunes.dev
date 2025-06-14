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
    
    // Improved visitor counter implementation
    const visitorCountElement = document.getElementById('visitorCount');
    
    // Show loading state
    if (visitorCountElement) {
        visitorCountElement.textContent = "...";
    }

    // Function to update the visitor counter
    const updateVisitorCount = () => {
        // Get stored count from localStorage as fallback
        let localCount = localStorage.getItem('visitorCount') || '0';
        localCount = parseInt(localCount, 10);
        
        // Determine if this is a new visit for this session
        const isNewVisit = !sessionStorage.getItem('visited');
        
        // For testing locally vs production
        const namespace = window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1') 
            ? 'aligunes.dev.test' 
            : 'aligunes.dev';
        
        // Try both CountAPI and a backup API to ensure reliability
        // Primary API: CountAPI
        const countApiUrl = isNewVisit 
            ? `https://api.countapi.xyz/hit/${namespace}/visits` 
            : `https://api.countapi.xyz/get/${namespace}/visits`;
            
        // Use a Promise with timeout to handle API failures gracefully
        const fetchWithTimeout = (url, options = {}, timeout = 3000) => {
            return Promise.race([
                fetch(url, options),
                new Promise((_, reject) => 
                    setTimeout(() => reject(new Error('Request timed out')), timeout)
                )
            ]);
        };
        
        // Try to use the CountAPI service
        fetchWithTimeout(countApiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && data.value) {
                    // Use the API count
                    if (visitorCountElement) {
                        visitorCountElement.textContent = data.value.toLocaleString();
                    }
                    
                    // Store the count locally as fallback
                    localStorage.setItem('visitorCount', data.value);
                    
                    // Mark as visited for this session
                    sessionStorage.setItem('visited', 'true');
                } else {
                    throw new Error('Invalid data from API');
                }
            })
            .catch(error => {
                console.warn('CountAPI error:', error);
                useFallbackCounter();
            });
            
        // Fallback counter implementation
        const useFallbackCounter = () => {
            // If this is a new visit, increment the local counter
            if (isNewVisit) {
                localCount++;
                localStorage.setItem('visitorCount', localCount);
                sessionStorage.setItem('visited', 'true');
            }
            
            // Display the local count
            if (visitorCountElement) {
                visitorCountElement.textContent = localCount.toLocaleString();
            }
        };
    };
    
    // Update the visitor count
    updateVisitorCount();
});

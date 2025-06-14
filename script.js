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
    
    // Visitor counter using Vercel serverless function
    const visitorCountElement = document.getElementById('visitorCount');
    
    if (visitorCountElement) {
        // Show loading state initially
        visitorCountElement.textContent = "...";
        
        // Get API URL based on environment
        const apiUrl = window.location.hostname === 'localhost' || window.location.hostname.includes('127.0.0.1')
            ? 'http://localhost:3000/api/visitor-count'
            : '/api/visitor-count';
            
        // Check if this is a new visit for this session
        const isNewVisit = !sessionStorage.getItem('visited');
        
        // Function to fetch the visitor count
        const fetchVisitorCount = async () => {
            try {
                // Use POST for new visits to increment the counter, GET for returning visitors
                const method = isNewVisit ? 'POST' : 'GET';
                
                const response = await fetch(apiUrl, { 
                    method,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                
                const data = await response.json();
                
                // Display the count
                if (data && data.count !== undefined) {
                    visitorCountElement.textContent = data.count.toLocaleString();
                    
                    // Mark as visited for this session
                    if (isNewVisit) {
                        sessionStorage.setItem('visited', 'true');
                    }
                } else {
                    throw new Error('Invalid data from API');
                }
            } catch (error) {
                console.error('Error fetching visitor count:', error);
                visitorCountElement.textContent = "?";
            }
        };
        
        // Fetch the visitor count
        fetchVisitorCount();
    }
});

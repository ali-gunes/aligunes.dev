function toggleMobileMenu() {
    const menuOverlay = document.getElementById('mobile-menu-overlay');
    const body = document.body;
    
    menuOverlay.classList.toggle('open');
    body.classList.toggle('no-scroll');
    
    // Prevent background scrolling when menu is open
    if (body.classList.contains('no-scroll')) {
        body.style.overflow = 'hidden';
    } else {
        body.style.overflow = '';
    }
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
    
    // Close mobile menu when clicking a link that navigates to an anchor
    document.querySelectorAll('.mobile-menu-links a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            toggleMobileMenu();
        });
    });
});

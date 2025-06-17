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

// Project data
const projectData = {
    'saydam-emek': {
        title: 'Saydam Emek',
        description: 'A platform that brings transparency to labor markets by allowing workers to share their experiences and salary information anonymously. The platform aims to empower job seekers with real information about companies and working conditions.',
        image: './assets/saydam-emek.svg',
        tech: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT Authentication'],
        links: [
            { text: 'Github', url: 'https://github.com/ali-gunes/transparent-labour' },
            { text: 'Live Demo', url: 'https://saydamemek.com' }
        ]
    },
    'planning-poker': {
        title: 'Planning Poker',
        description: 'An agile planning tool that helps teams estimate tasks collaboratively through a fun and interactive card-based system. Features real-time updates, session management, and result visualization to make sprint planning more efficient.',
        image: './assets/planning-poker.svg',
        tech: ['Next.js', 'WebSockets', 'Tailwind CSS', 'React Hooks', 'Chart.js'],
        links: [
            { text: 'Github', url: 'https://github.com/ali-gunes/planning_poker' },
            { text: 'Live Demo', url: 'https://planning-poker-ochre.vercel.app/' }
        ]
    },
    'duel-of-champions': {
        title: 'Duel of Champions',
        description: 'A blockchain-based card game built on the NEAR protocol that allows players to battle with unique digital collectibles. The game features smart contracts for secure gameplay, ownership verification, and transparent transactions.',
        image: './assets/duel-of-champions.svg',
        tech: ['NEAR Protocol', 'Rust', 'React', 'Web3.js', 'Smart Contracts'],
        links: [
            { text: 'Github', url: 'https://github.com/ali-gunes/near-duel-of-champions' }
        ]
    },
    'image-manipulator': {
        title: 'Image Manipulator',
        description: 'A desktop application for image processing with various filters, transformations, and batch processing capabilities. The tool supports a wide range of image formats and provides an intuitive interface for both basic and advanced editing.',
        image: './assets/image-manipulator.png',
        tech: ['Python', 'OpenCV', 'PyQT', 'NumPy', 'Scikit-Image'],
        links: [
            { text: 'Github', url: 'https://github.com/ali-gunes/image-manipulation' }
        ]
    },
    'go-to-moon': {
        title: 'Go to Moon',
        description: 'An upcoming space exploration simulation game that allows players to build and manage their own space program. Players will design rockets, plan missions, and expand their space infrastructure while managing resources and research.',
        image: './assets/coming-soon.jpg',
        tech: ['Unity', 'C#', '3D Modeling', 'Physics Simulation', 'Procedural Generation'],
        links: [
            { text: 'Github', url: 'https://www.github.com/ali-gunes/' }
        ]
    }
};

// Function to open project modal
function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;
    
    // Set modal content
    document.getElementById('modal-project-img').src = project.image;
    document.getElementById('modal-project-img').alt = project.title;
    document.getElementById('modal-project-title').textContent = project.title;
    document.getElementById('modal-project-description').textContent = project.description;
    
    // Set tech tags
    const techContainer = document.getElementById('modal-project-tech');
    techContainer.innerHTML = '';
    project.tech.forEach(tech => {
        const techTag = document.createElement('span');
        techTag.className = 'tech-tag';
        techTag.textContent = tech;
        techContainer.appendChild(techTag);
    });
    
    // Set buttons
    const buttonsContainer = document.getElementById('modal-project-buttons');
    buttonsContainer.innerHTML = '';
    project.links.forEach(link => {
        const button = document.createElement('button');
        button.className = 'btn btn-color-2 project-btn';
        button.textContent = link.text;
        button.onclick = function() {
            window.open(link.url, '_blank');
        };
        buttonsContainer.appendChild(button);
    });
    
    // Show modal
    const modalOverlay = document.getElementById('project-modal-overlay');
    modalOverlay.style.display = 'flex';
    document.body.classList.add('modal-open');
}

// Function to close project modal
function closeProjectModal() {
    const modalOverlay = document.getElementById('project-modal-overlay');
    modalOverlay.style.display = 'none';
    document.body.classList.remove('modal-open');
}

// Close modal when clicking outside the modal content
document.addEventListener('click', function(event) {
    const modalOverlay = document.getElementById('project-modal-overlay');
    const modal = document.querySelector('.project-modal');
    
    if (modalOverlay && event.target === modalOverlay) {
        closeProjectModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProjectModal();
    }
});

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

function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Check if visitor has already visited during this session
if (!sessionStorage.getItem('visited')) {
    // If not visited, increment visitor count and mark as visited
    let visitorCount = localStorage.getItem('visitorCount');
    if (!visitorCount) {
        visitorCount = 0;
    } else {
        visitorCount = parseInt(visitorCount);
    }

    visitorCount++;
    document.getElementById('visitorCount').textContent = visitorCount;

    localStorage.setItem('visitorCount', visitorCount.toString());
    sessionStorage.setItem('visited', 'true');
}

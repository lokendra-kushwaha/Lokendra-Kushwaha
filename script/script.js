// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// ==========================================
// Mobile Hamburger Menu Logic
// ==========================================
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');

// Toggle menu on clicking the hamburger icon
hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
    
    // Change hamburger icon to a cross (optional)
    const icon = hamburger.querySelector('i');
    if (menu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close the menu automatically when any link is clicked
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});
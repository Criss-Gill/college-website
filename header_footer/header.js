document.addEventListener("DOMContentLoaded", function () {
    // Toggle Menu Functionality
    function toggleMenu() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    }

    // Close the menu when clicking outside or scrolling
    function closeMenu(event) {
        const navLinks = document.querySelector('.nav-links');
        const menuIconContainer = document.querySelector('.menu-icon-container');
        if (
            navLinks.classList.contains('active') &&
            (!navLinks.contains(event.target) && !menuIconContainer.contains(event.target))
        ) {
            navLinks.classList.remove('active');
        }
    }

    // Hero Parallax Effect
    function handleHeroParallax() {
        const scrollPosition = window.scrollY;

        // Hero Image Parallax
        const heroImage = document.querySelector(".hero img");
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrollPosition * -0.3}px)`;
        }
    }

    // Attach Event Listeners
    document.querySelector('.menu-icon-container').addEventListener("click", toggleMenu);
    document.addEventListener("click", closeMenu);
    window.addEventListener("scroll", handleHeroParallax);

    // Run Hero Parallax on page load
    handleHeroParallax();
});

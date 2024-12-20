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

    // Smooth Scroll to Next Section
    function scrollToNextSection() {
        const heroSection = document.querySelector('.hero');
        const nextSection = heroSection.nextElementSibling; // Select the section immediately after the hero section

        if (nextSection) {
            // Smoothly scroll to the next section
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    }

    // Attach Event Listeners
    document.querySelector('.menu-icon-container').addEventListener("click", toggleMenu);
    document.addEventListener("click", closeMenu);
    window.addEventListener("scroll", handleHeroParallax);

    // Attach Scroll Event to "Get Started" Button
    const getStartedButton = document.querySelector('.hero button');
    if (getStartedButton) {
        getStartedButton.addEventListener("click", scrollToNextSection);
    }

    // Run Hero Parallax on page load
    handleHeroParallax();
});

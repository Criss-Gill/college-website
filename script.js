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

    // Select all highlight boxes
    const highlights = document.querySelectorAll('.highlight');
    const offerSection = document.querySelector('.offer');
    const coursesSection = document.querySelector('.courses-section');
    const sectionsToAnimate = [offerSection, coursesSection];

    // Function to check if an element is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= window.innerHeight && rect.bottom >= 0;
    }

    // Add the animation class when in the viewport
    function handleScrollAnimation() {
        highlights.forEach((highlight) => {
            if (isInViewport(highlight)) {
                highlight.classList.add('animate-slide-up');
            }
        });

        // Offer section and items
        const offerItems = document.querySelectorAll('.offer-item, .offer-image');
        if (isInViewport(offerSection)) {
            offerItems.forEach(item => {
                item.classList.add('animate-slide-up');
            });
        }

        // Courses section
        if (isInViewport(coursesSection)) {
            coursesSection.classList.add('animate-slide-up');
            const courseBoxes = document.querySelectorAll('.course-box');
            courseBoxes.forEach(box => {
                box.classList.add('animate-slide-up');
            });
        }
    }

    // Parallax Effects
    function handleParallaxEffects() {
        const scrollPosition = window.scrollY;

        // Hero Image Parallax
        const heroImage = document.querySelector(".hero img");
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrollPosition * -0.3}px)`;
        }

        // Landscape Image Parallax
        const landscapeImage = document.querySelector(".landscape-section img");
        if (landscapeImage) {
            const multiplier = window.innerWidth <= 768 ? -0.16 : -0.3;
            landscapeImage.style.transform = `translateY(${scrollPosition * multiplier}px)`;
        }
    }

    // Unified Scroll Event Handler
    function handleScroll() {
        handleParallaxEffects();
        handleScrollAnimation();
    }

    // Automatic Testimonial Slider
    const testimonialSlider = document.querySelector(".testimonial-slider");
    const testimonials = document.querySelectorAll(".testimonial-box");
    const totalTestimonials = testimonials.length;
    let currentIndex = 0;

    // Function to update the slider position
    function updateSlider() {
        const offset = -currentIndex * 100; // Each testimonial is 100% of the container's width
        testimonialSlider.style.transform = `translateX(${offset}%)`;
    }

    // Function to move to the next testimonial
    function nextTestimonial() {
        currentIndex = (currentIndex + 1) % totalTestimonials; // Loop back to the first testimonial
        updateSlider();
    }

    // Show/Hide International Fields Based on Student Type Selection
    document.getElementById('student-type').addEventListener('change', function () {
        const internationalFields = document.getElementById('international-fields');
        if (this.value === 'international') {
            internationalFields.style.display = 'block';
        } else {
            internationalFields.style.display = 'none';
        }
    });

    // Attach Event Listeners
    document.querySelector('.menu-icon-container').addEventListener("click", toggleMenu);
    document.addEventListener("click", closeMenu);
    window.addEventListener("scroll", handleScroll);

    // Run animations and parallax effects on load
    handleScroll();

    // Automatically slide testimonials every 4 seconds
    setInterval(nextTestimonial, 4000);

    // Apply the slide-up animation to elements that are in the viewport
    handleScrollAnimation();
});

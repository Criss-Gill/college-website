document.addEventListener("DOMContentLoaded", function() {
    function toggleMenu() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('active');
    }

    document.querySelector('.menu-icon-container').addEventListener("click", toggleMenu);

    // Close the menu when clicking outside the menu
    document.addEventListener("click", (event) => {
        const navLinks = document.querySelector('.nav-links');
        const menuIconContainer = document.querySelector('.menu-icon-container');

        // Check if the click is outside the menu and menu icon
        if (navLinks.classList.contains('active') && !navLinks.contains(event.target) && !menuIconContainer.contains(event.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Close the menu when the user starts scrolling
    document.addEventListener("scroll", () => {
        const navLinks = document.querySelector('.nav-links');
        const menuIconContainer = document.querySelector('.menu-icon-container');

        // Only remove 'active' if the user is NOT clicking the menu icon
        if (navLinks.classList.contains('active')) {
            const isMenuClicked = menuIconContainer.matches(":hover");
            if (!isMenuClicked) {
                navLinks.classList.remove('active');
            }
        }

        // Hero section parallax effect
        const heroImage = document.querySelector(".hero img");
        const scrollPosition = window.scrollY; // Current scroll position
        heroImage.style.transform = `translateY(${scrollPosition * -0.3}px)`; 
    });

    // Parallax effect for the landscape section
    document.addEventListener("scroll", () => {
        const landscapeImage = document.querySelector(".landscape-section img");
        const scrollPosition = window.scrollY; // Get vertical scroll position

        // Apply parallax effect on all devices, but adjust multiplier for smaller screens
        const multiplier = window.innerWidth <= 768 ? -0.16 : -0.3; // Lighter effect on mobile devices
        const offset = scrollPosition * multiplier; // Calculate the parallax offset
        landscapeImage.style.transform = `translateY(${offset}px)`; // Apply the parallax effect
    });


      // Show/Hide International Fields Based on Student Type Selection
      document.getElementById('student-type').addEventListener('change', function () {
        const internationalFields = document.getElementById('international-fields');
        if (this.value === 'international') {
            internationalFields.style.display = 'block';
        } else {
            internationalFields.style.display = 'none';
        }
    });




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

    // Automatically slide testimonials every 4 seconds
    setInterval(nextTestimonial, 4000);

    // Allow manual scrolling (optional, if needed in future)
    testimonialSlider.addEventListener("wheel", (event) => {
        event.preventDefault();
        if (event.deltaY > 0) {
            // Scroll down -> move to the next testimonial
            currentIndex = (currentIndex + 1) % totalTestimonials;
        } else {
            // Scroll up -> move to the previous testimonial
            currentIndex = (currentIndex - 1 + totalTestimonials) % totalTestimonials;
        }
        updateSlider();
    });
});

document.addEventListener("DOMContentLoaded", function () {
    /** -------------------------------
     *  1. MENU FUNCTIONALITY
     * ------------------------------- */
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

    // Attach Event Listeners for Menu
    document.querySelector('.menu-icon-container').addEventListener("click", toggleMenu);
    document.addEventListener("click", closeMenu);

    /** -------------------------------
     *  2. HERO PARALLAX EFFECT
     * ------------------------------- */
    function handleHeroParallax() {
        const scrollPosition = window.scrollY;

        // Get all images in the hero section
        const images = document.querySelectorAll(".hero-images img");

        // Apply parallax effect to each image
        images.forEach((image, index) => {
            const parallaxStrength = 0.3;  // Adjust parallax strength for layering (+ index * 0.1;)its to increase effect in next img
            image.style.transform = `translateY(${scrollPosition * -parallaxStrength}px)`;
        });
    }

    // Attach Parallax Effect to Scroll Event
    window.addEventListener("scroll", handleHeroParallax);
    handleHeroParallax(); // Run on page load

    /** -------------------------------
     *  3. SMOOTH SCROLL FUNCTIONALITY
     * ------------------------------- */
    function scrollToNextSection() {
        const heroSection = document.querySelector('.hero');
        const nextSection = heroSection.nextElementSibling; // Select the section immediately after the hero section

        if (nextSection) {
            // Smoothly scroll to the next section
            nextSection.scrollIntoView({ behavior: "smooth" });
        }
    }

    // Attach Scroll Event to "Get Started" Button
    const getStartedButton = document.querySelector('.hero button');
    if (getStartedButton) {
        getStartedButton.addEventListener("click", scrollToNextSection);
    }

    /** -------------------------------
     *  4. IMAGE SLIDESHOW WITH RANDOM ORDER
     * ------------------------------- */
    const images = document.querySelectorAll(".hero-images img");
    let currentIndex = -1; // Initialize to -1 to indicate no image is active yet

    function changeImageRandomly() {
        if (currentIndex !== -1) {
            // Remove the 'active' class from the current image
            images[currentIndex].classList.remove("active");
        }

        // Generate a random index that is different from the current index
        let nextIndex;
        do {
            nextIndex = Math.floor(Math.random() * images.length);
        } while (nextIndex === currentIndex); // Avoid repeating the same image

        // Update the currentIndex to the new index
        currentIndex = nextIndex;

        // Add the 'active' class to the new image
        images[currentIndex].classList.add("active");
    }

    // Start Image Slideshow
    if (images.length > 0) {
        setInterval(changeImageRandomly, 6000); // Change the image every 6 seconds
        changeImageRandomly(); // Set the first random image on page load
    }

    /** -------------------------------
     *  5. LETTER-BY-LETTER TEXT ANIMATION
     * ------------------------------- */
    function animateText(elementId, delay) {
        const element = document.getElementById(elementId);
        const text = element.innerText;
        element.innerHTML = ""; // Clear existing text
        text.split("").forEach((letter, index) => {
            const span = document.createElement("span");
            span.className = "letter";
            span.style.animationDelay = `${index * delay}s`;
            span.innerText = letter === " " ? "\u00A0" : letter; // Preserve spaces
            element.appendChild(span);
        });
    }

    // Apply Letter-by-Letter Animation
    animateText("hero-heading", 0.1); // Apply to heading with 0.1s delay
    animateText("hero-paragraph", 0.05); // Apply to paragraph with 0.05s delay

    /** -------------------------------
     *  6. WORD SWITCHING ANIMATION
     * ------------------------------- */
    const heading = document.getElementById("hero-heading");
    const staticPart = "Better"; // Static word
    const phrases = ["Teachers", "Education", "Future"]; // Highlighted words
    const highlightId = "hero-highlight"; // ID for the animated span
    let currentIndexWord = 0; // To track the current word
    let isAnimating = false; // Prevent overlapping animations

    function createLetterAnimation(word, isFadeIn, callback) {
        const letters = word.split(""); // Split word into individual letters
        const spanWrapper = document.createElement("span");
        spanWrapper.id = highlightId;
        spanWrapper.style.display = "inline-block"; // Ensure proper letter animations
        heading.innerHTML = `${staticPart} `;
        heading.appendChild(spanWrapper); // Add the wrapper for letters

        letters.forEach((letter, index) => {
            const span = document.createElement("span");
            span.textContent = letter;
            span.style.display = "inline-block";
            span.style.opacity = isFadeIn ? "0" : "1";
            span.style.transition = `opacity 0.3s ease ${index * 0.15}s`; // Delay stagger for each letter
            spanWrapper.appendChild(span);

            // Trigger the fade-in or fade-out animation
            setTimeout(() => {
                span.style.opacity = isFadeIn ? "1" : "0";
            }, 50);
        });

        // Wait for all letters to finish animating before calling the callback
        const totalAnimationTime = 0.3 * letters.length + 0.15 * letters.length; // Total animation duration
        setTimeout(() => {
            callback && callback();
        }, totalAnimationTime * 400);
    }

    function switchWord() {
        if (isAnimating) return; // Prevent overlapping animations
        isAnimating = true;

        const currentWord = phrases[currentIndexWord];
        const nextIndex = (currentIndexWord + 1) % phrases.length;
        const nextWord = phrases[nextIndex];

        // Letter-by-letter fade-out of the current word
        createLetterAnimation(currentWord, false, () => {
            // After fade-out, fade-in the next word
            createLetterAnimation(nextWord, true, () => {
                currentIndexWord = nextIndex; // Update the current index
                isAnimating = false; // Allow new animations
            });
        });
    }

    // Start Word Switching Animation
    setInterval(switchWord, 5000); // Run every 5 seconds
    createLetterAnimation(phrases[currentIndexWord], true, () => {}); // Initial fade-in of the first word
});



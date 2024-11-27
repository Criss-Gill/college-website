function showCourses(courseId) {
    // Hide all course sections
    const allCourses = document.querySelectorAll('.course-details');
    allCourses.forEach(course => course.classList.add('hidden'));

    // Display the selected course section
    const selectedCourse = document.getElementById(courseId);
    if (selectedCourse) {
        selectedCourse.classList.remove('hidden');
        document.getElementById('dynamic-courses-section').classList.remove('hidden');

        // Scroll to the dynamic courses section
        document.getElementById('dynamic-courses-section').scrollIntoView({
            behavior: 'smooth', // Smooth scrolling
            block: 'start' // Align to the top of the section
        });
    }
}

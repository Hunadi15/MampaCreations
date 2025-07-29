
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link, #view-work-button');
        document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.getElementById('nnavLinks');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const contactForm = document.getElementById('contact-form');
    // Ensure you add <p id="form-message"></p> inside your contact form or nearby in your HTML
    const formMessage = document.getElementById('form-message');

    // Dark Mode Elements
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const themeToggleBtnMobile = document.getElementById('theme-toggle-mobile');
    const sunIconMobile = document.getElementById('sun-icon-mobile');
    const moonIconMobile = document.getElementById('moon-icon-mobile');

    // Function to set the theme
    function setTheme(theme) {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
            sunIconMobile.classList.remove('hidden');
            moonIconMobile.classList.add('hidden');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
            sunIconMobile.classList.add('hidden');
            moonIconMobile.classList.remove('hidden');
        }
    }

    // On page load, check for saved theme preference or system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    // Event listener for desktop theme toggle
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        setTheme(currentTheme === 'light' ? 'dark' : 'light');
    });

    // Event listener for mobile theme toggle
    themeToggleBtnMobile.addEventListener('click', () => {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
        setTheme(currentTheme === 'light' ? 'dark' : 'light');
    });

    // Smooth scrolling for navigation links
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Mobile menu toggle
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
    });

    closeMobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });

    navLinks.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // --- EmailJS Integration for Contact Form ---
    const serviceSelect = document.getElementById('serviceSelect');

    // Handle form submission using EmailJS
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent actual form submission

            // Display "Sending message..."
            if (formMessage) {
                formMessage.classList.remove('text-green-600', 'text-red-600', 'dark:text-gray-100');
                formMessage.classList.add('text-gray-700', 'dark:text-gray-300'); // Set initial text color
                formMessage.textContent = 'Sending message...';
            }

            // Get form values for EmailJS
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                title: document.getElementById('serviceSelect').value,
                message: document.getElementById('message').value
            };

            emailjs.init("biVoV0ngVLFgW30Fj");
            emailjs.send("service_bo9uwlm", "template_6m2yxma", formData) // Pass formData here
                .then((response) => {
                    alert('Massege sent successfully');
                    if (formMessage) {
                        formMessage.classList.remove('text-gray-700', 'dark:text-gray-300', 'text-red-600');
                        formMessage.classList.add('text-green-600', 'font-medium'); // Added font-medium for emphasis
                        formMessage.textContent = 'Message sent successfully! Mampa Creations will get back to you soon.';
                    }
                    contactForm.reset(); // Clear the form
                })
                .catch((error) => {
                    alert("Massege Failed:");
                    if (formMessage) {
                        formMessage.classList.remove('text-gray-700', 'dark:text-gray-300', 'text-green-600');
                        formMessage.classList.add('text-red-600', 'font-medium'); // Added font-medium for emphasis
                        formMessage.textContent = 'Failed to send message. Please try again later.';
                    }
                });
        });
    }
});



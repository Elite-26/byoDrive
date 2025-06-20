// DOM elements
const navbar = document.getElementById('navbar');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const closeIcon = document.getElementById('close-icon');
const contactForm = document.querySelector('form');

// State variables
let isMenuOpen = false;
let scrolled = false;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Add form submit event listener
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Add smooth scrolling to all navigation links
    addSmoothScrolling();
    
    // Add intersection observer for animations
    addIntersectionObserver();
}

// Handle scroll events
function handleScroll() {
    const scrollY = window.scrollY;
    const newScrolled = scrollY > 10;
    
    if (newScrolled !== scrolled) {
        scrolled = newScrolled;
        updateNavbar();
    }
}

// Update navbar appearance based on scroll position
function updateNavbar() {
    if (scrolled) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Toggle mobile menu
function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
        mobileMenu.classList.add('active');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        mobileMenu.classList.remove('active');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
}

// Scroll to section smoothly
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
    
    // Close mobile menu if open
    if (isMenuOpen) {
        toggleMenu();
    }
}

// Add smooth scrolling to all navigation links
function addSmoothScrolling() {
    const navLinks = document.querySelectorAll('[onclick*="scrollToSection"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('onclick').match(/scrollToSection\('([^']+)'\)/)[1];
            scrollToSection(sectionId);
        });
    });
}

// Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData);
    
    // Validate form
    if (!validateForm(formObject)) {
        return;
    }
    
    // Show loading state
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.classList.add('loading');
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        showMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
        
        // Reset form
        event.target.reset();
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.classList.remove('loading');
    }, 2000);
}

// Validate form data
function validateForm(data) {
    const errors = [];
    
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    if (errors.length > 0) {
        showMessage(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show message to user
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = `message message-${type}`;
    messageElement.innerHTML = message;
    
    // Insert message after form
    const form = document.querySelector('form');
    if (form) {
        form.parentNode.insertBefore(messageElement, form.nextSibling);
        
        // Auto-remove message after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 5000);
    }
}

// Add intersection observer for animations
function addIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll('.bg-gray-900, .bg-gray-800');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Add parallax effect to hero section
function addParallaxEffect() {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = heroSection.querySelector('img');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
}

// Add counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 16);
                
                counterObserver.unobserve(counter);
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Add lazy loading for images
function addLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Add keyboard navigation support
function addKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        // Escape key to close mobile menu
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu();
        }
        
        // Arrow keys for navigation (optional)
        if (e.key === 'ArrowDown' && e.ctrlKey) {
            e.preventDefault();
            const currentSection = getCurrentSection();
            const nextSection = getNextSection(currentSection);
            if (nextSection) {
                scrollToSection(nextSection);
            }
        }
        
        if (e.key === 'ArrowUp' && e.ctrlKey) {
            e.preventDefault();
            const currentSection = getCurrentSection();
            const prevSection = getPreviousSection(currentSection);
            if (prevSection) {
                scrollToSection(prevSection);
            }
        }
    });
}

// Get current section based on scroll position
function getCurrentSection() {
    const sections = ['home', 'pricing', 'contact'];
    const scrollY = window.scrollY;
    
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollY + 100) {
            return sections[i];
        }
    }
    
    return 'home';
}

// Get next section
function getNextSection(currentSection) {
    const sections = ['home', 'pricing', 'contact'];
    const currentIndex = sections.indexOf(currentSection);
    return sections[currentIndex + 1] || null;
}

// Get previous section
function getPreviousSection(currentSection) {
    const sections = ['home', 'pricing', 'contact'];
    const currentIndex = sections.indexOf(currentSection);
    return sections[currentIndex - 1] || null;
}

// Add smooth reveal animations for sections
function addRevealAnimations() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    addParallaxEffect();
    animateCounters();
    addLazyLoading();
    addKeyboardNavigation();
    addRevealAnimations();
});

// Add CSS for reveal animations
const revealStyles = `
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    img {
        opacity: 0;
        transition: opacity 0.3s ease-in;
    }
    
    img.loaded {
        opacity: 1;
    }
`;

// Inject reveal styles
const styleSheet = document.createElement('style');
styleSheet.textContent = revealStyles;
document.head.appendChild(styleSheet);

// Export functions for global access (if needed)
window.ByoDrive = {
    scrollToSection,
    toggleMenu,
    handleFormSubmit,
    handleLogin,
    openTermsOfService,
    openPrivacyPolicy
};

// Handle login button click
function handleLogin() {
    // Close mobile menu if open
    if (isMenuOpen) {
        toggleMenu();
    }
    
    // Show login modal or redirect to login page
    // For now, we'll show an alert - you can replace this with your login logic
    alert('Login functionality coming soon!');
    
    // Alternative: Redirect to login page
    // window.location.href = '/login';
    
    // Alternative: Open login modal
    // openLoginModal();
}

// Handle Terms of Service button click
function openTermsOfService() {
    // Close mobile menu if open
    if (isMenuOpen) {
        toggleMenu();
    }
    
    // Scroll to terms of service section
    scrollToSection('terms-of-service');
}

// Handle Privacy Policy button click
function openPrivacyPolicy() {
    // Close mobile menu if open
    if (isMenuOpen) {
        toggleMenu();
    }
    
    // Scroll to privacy policy section
    scrollToSection('privacy-policy');
} 
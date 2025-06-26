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
    
    // Initialize Buy Credits functionality
    if (typeof initializeBuyCredits === 'function') {
        initializeBuyCredits();
    }
    
    // Initialize Plan Manage buttons
    if (typeof initializePlanManageButtons === 'function') {
        initializePlanManageButtons();
    }
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

// Toggle user menu (for dashboard)
function toggleUserMenu() {
    // For now, just show a simple alert
    // You can implement a dropdown menu here later
    alert('User menu functionality coming soon!');
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
    
    // Navigate to login page
    window.location.href = 'login.html';
}

// Handle logout button click
function handleLogout() {
    // Close mobile menu if open
    if (isMenuOpen) {
        toggleMenu();
    }
    
    // Navigate back to landing page
    window.location.href = 'index.html';
}

// Set user name (can be called after successful login)
function setUserName(name) {
    const userNameElement = document.getElementById('user-name');
    const userNameMobileElement = document.getElementById('user-name-mobile');
    
    if (userNameElement) {
        userNameElement.textContent = name;
    }
    
    if (userNameMobileElement) {
        userNameMobileElement.textContent = name;
    }
}

// Handle SSO provider login
function loginWithProvider(provider, userName) {
    // Store user information in sessionStorage for the dashboard
    sessionStorage.setItem('currentUser', userName);
    sessionStorage.setItem('loginProvider', provider);
    
    // Navigate to dashboard
    window.location.href = 'dashboard.html';
}

// Handle tab switching
function switchTab(tabName) {
    // Remove active class from all tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Hide all tab content
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked tab
    const activeTab = document.querySelector(`[onclick="switchTab('${tabName}')"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Show corresponding content
    const activeContent = document.getElementById(`${tabName}-content`);
    if (activeContent) {
        activeContent.classList.add('active');
    }
    
    // Handle membership card manage button visibility
    const manageButton = document.querySelector('.membership-card .manage-btn');
    if (manageButton) {
        if (tabName === 'payments' || tabName === 'settings') {
            manageButton.style.display = 'none';
        } else {
            manageButton.style.display = 'inline-flex';
        }
    }
    
    console.log('Switched to tab:', tabName);
}

// Handle Terms of Service button click
function openTermsOfService() {
    // Close mobile menu if open
    if (isMenuOpen) {
        toggleMenu();
    }
    
    // Navigate to terms of service page
    window.location.href = 'terms.html';
}

// Handle Privacy Policy button click
function openPrivacyPolicy() {
    // Close mobile menu if open
    if (isMenuOpen) {
        toggleMenu();
    }
    
    // Navigate to privacy policy page
    window.location.href = 'privacy.html';
}

// Handle Plan Selection
function handlePlanSelection(planId) {
    // Remove active class from all plan cards
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add active class to selected plan card
    const selectedCard = document.querySelector(`#${planId}`).closest('.plan-card');
    if (selectedCard) {
        selectedCard.classList.add('selected');
    }
}

// Initialize Plan Selection functionality
function initializePlanSelection() {
    const planRadios = document.querySelectorAll('.plan-radio');
    planRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            handlePlanSelection(this.id);
        });
    });
}

// Handle Membership Manage button click
function handleMembershipManage() {
    // For now, just show a simple alert
    alert('Membership management functionality coming soon!');
}

// Initialize Membership Manage functionality
function initializeMembershipManage() {
    const manageBtn = document.querySelector('.manage-btn');
    if (manageBtn) {
        manageBtn.addEventListener('click', handleMembershipManage);
    }
}

// Handle Plan Manage button click
function handlePlanManage(planName) {
    // Find the plan card and check if its radio button is selected
    const planCards = document.querySelectorAll('.plan-card');
    let selectedPlanCard = null;
    
    for (const card of planCards) {
        const planNameElement = card.querySelector('.plan-name');
        if (planNameElement && planNameElement.textContent === planName) {
            selectedPlanCard = card;
            break;
        }
    }
    
    if (selectedPlanCard) {
        const radioButton = selectedPlanCard.querySelector('.plan-radio');
        if (radioButton && radioButton.checked) {
            // Radio button is selected, open the modal
            openManagePlanModal(planName);
        } else {
            // Radio button is not selected, show a message
            showToast('Please select this plan first before managing it.');
        }
    }
}

// Open Manage Plan Modal
function openManagePlanModal(planName) {
    const modal = document.getElementById('add-card-modal');
    const modalTitle = document.getElementById('modal-title');
    const creditAmountSection = document.getElementById('credit-amount-section');
    const paymentMethodSection = document.getElementById('payment-method-section');
    const cardSubmitBtn = document.getElementById('card-submit-btn');
    
    if (modal && modalTitle && creditAmountSection && paymentMethodSection && cardSubmitBtn) {
        // Change modal title and button text
        modalTitle.textContent = planName;
        cardSubmitBtn.textContent = 'Subscribe';
        
        // Show credit amount section and payment method section
        creditAmountSection.classList.remove('hidden');
        paymentMethodSection.classList.remove('hidden');
        
        // Hide add payment subheader (used for buy credits mode)
        const addPaymentSubheader = document.getElementById('add-payment-subheader');
        if (addPaymentSubheader) {
            addPaymentSubheader.classList.add('hidden');
        }
        
        // Set modal mode to 'manage-plan'
        modal.setAttribute('data-mode', 'manage-plan');
        modal.setAttribute('data-plan-name', planName);
        
        // Show modal
        modal.classList.add('active');
        
        // Reset to initial state
        resetLinkCardForm();
        resetCreditAmount();
        resetPaymentMethodSelection();
    }
}

// Initialize Plan Manage buttons
function initializePlanManageButtons() {
    const planManageBtns = document.querySelectorAll('.plan-manage-btn');
    planManageBtns.forEach(btn => {
        // Remove any existing event listeners to prevent duplicates
        btn.removeEventListener('click', btn.planManageHandler);
        
        // Create a new handler function for this specific button
        btn.planManageHandler = function(e) {
            e.preventDefault();
            e.stopPropagation(); // Prevent event bubbling
            
            const planCard = this.closest('.plan-card');
            const planName = planCard.querySelector('.plan-name').textContent;
            handlePlanManage(planName);
        };
        
        // Add the event listener
        btn.addEventListener('click', btn.planManageHandler);
    });
}

// Select Payment Method
function selectPaymentMethod(method) {
    // Remove selected class from all payment method cards
    const paymentCards = document.querySelectorAll('.payment-method-card');
    paymentCards.forEach(card => {
        card.classList.remove('selected');
    });
    
    // Add selected class to clicked card
    const selectedCard = event.currentTarget;
    selectedCard.classList.add('selected');
    
    // Store selected payment method
    const modal = document.getElementById('add-card-modal');
    if (modal) {
        modal.setAttribute('data-payment-method', method);
    }
}

// Reset Payment Method Selection
function resetPaymentMethodSelection() {
    const paymentCards = document.querySelectorAll('.payment-method-card');
    paymentCards.forEach(card => {
        card.classList.remove('selected');
    });
    
    const modal = document.getElementById('add-card-modal');
    if (modal) {
        modal.removeAttribute('data-payment-method');
    }
}

// Handle Add Payment Method button click
function handleAddPaymentMethod() {
    openAddCardModal();
}

// Open Add Card Modal
function openAddCardModal() {
    const modal = document.getElementById('add-card-modal');
    if (modal) {
        modal.classList.add('active');
        // Reset to initial state
        resetLinkCardForm();
    }
}

// Close Add Card Modal
function closeAddCardModal() {
    const modal = document.getElementById('add-card-modal');
    const modalTitle = document.getElementById('modal-title');
    const creditAmountSection = document.getElementById('credit-amount-section');
    const addPaymentSubheader = document.getElementById('add-payment-subheader');
    const paymentMethodSection = document.getElementById('payment-method-section');
    const cardSubmitBtn = document.getElementById('card-submit-btn');
    
    if (modal) {
        modal.classList.remove('active');
        
        // Reset modal to "Add Card" mode
        if (modalTitle) modalTitle.textContent = 'Add Card';
        if (cardSubmitBtn) cardSubmitBtn.textContent = 'Submit';
        if (creditAmountSection) creditAmountSection.classList.add('hidden');
        if (addPaymentSubheader) addPaymentSubheader.classList.add('hidden');
        if (paymentMethodSection) paymentMethodSection.classList.add('hidden');
        
        // Remove modal mode and related attributes
        modal.removeAttribute('data-mode');
        modal.removeAttribute('data-plan-name');
        modal.removeAttribute('data-payment-method');
        
        // Reset to initial state
        resetLinkCardForm();
        resetCreditAmount();
        resetPaymentMethodSelection();
    }
}

// Show Link Card Form
function showLinkCardForm() {
    const linkPaymentOption = document.getElementById('link-payment-option');
    const linkCardForm = document.getElementById('link-card-form');
    
    if (linkPaymentOption && linkCardForm) {
        linkPaymentOption.classList.add('hidden');
        linkCardForm.classList.remove('hidden');
    }
}

// Close Link Card Form (return to original state)
function closeLinkCardForm() {
    const linkPaymentOption = document.getElementById('link-payment-option');
    const linkCardForm = document.getElementById('link-card-form');
    
    if (linkPaymentOption && linkCardForm) {
        linkPaymentOption.classList.remove('hidden');
        linkCardForm.classList.add('hidden');
        // Clear email input
        const emailInput = document.getElementById('link-email');
        if (emailInput) {
            emailInput.value = '';
        }
    }
}

// Reset Link Card Form to initial state
function resetLinkCardForm() {
    const linkPaymentOption = document.getElementById('link-payment-option');
    const linkCardForm = document.getElementById('link-card-form');
    
    if (linkPaymentOption && linkCardForm) {
        linkPaymentOption.classList.remove('hidden');
        linkCardForm.classList.add('hidden');
        // Clear email input
        const emailInput = document.getElementById('link-email');
        if (emailInput) {
            emailInput.value = '';
        }
    }
}

// Initialize Add Payment Method functionality
function initializeAddPaymentMethod() {
    const addPaymentBtn = document.querySelector('.add-payment-btn');
    if (addPaymentBtn) {
        addPaymentBtn.addEventListener('click', handleAddPaymentMethod);
    }
    
    // Add click event to Link payment option
    const linkPaymentOption = document.getElementById('link-payment-option');
    if (linkPaymentOption) {
        linkPaymentOption.addEventListener('click', showLinkCardForm);
    }
}

// Handle Buy Credits button click
function handleBuyCredits() {
    openBuyCreditsModal();
}

// Open Buy Credits Modal
function openBuyCreditsModal() {
    const modal = document.getElementById('add-card-modal');
    const modalTitle = document.getElementById('modal-title');
    const creditAmountSection = document.getElementById('credit-amount-section');
    const addPaymentSubheader = document.getElementById('add-payment-subheader');
    const paymentMethodSection = document.getElementById('payment-method-section');
    const cardSubmitBtn = document.getElementById('card-submit-btn');
    
    if (modal && modalTitle && creditAmountSection && addPaymentSubheader && paymentMethodSection && cardSubmitBtn) {
        // Change modal title and button text
        modalTitle.textContent = 'Buy Credits';
        cardSubmitBtn.textContent = 'Pay';
        
        // Show credit amount section and add payment subheader
        creditAmountSection.classList.remove('hidden');
        addPaymentSubheader.classList.remove('hidden');
        
        // Hide payment method section (used for manage plan mode)
        paymentMethodSection.classList.add('hidden');
        
        // Set modal mode to 'buy-credits'
        modal.setAttribute('data-mode', 'buy-credits');
        
        // Show modal
        modal.classList.add('active');
        
        // Reset to initial state
        resetLinkCardForm();
        resetCreditAmount();
        resetPaymentMethodSelection();
    }
}

// Initialize Buy Credits functionality
function initializeBuyCredits() {
    const buyCreditsBtn = document.querySelector('.plan-buy-btn');
    if (buyCreditsBtn) {
        buyCreditsBtn.addEventListener('click', handleBuyCredits);
    }
    
    // Add event listener for credit amount input
    const creditInput = document.getElementById('credit-amount');
    if (creditInput) {
        creditInput.addEventListener('input', updateCreditControls);
        creditInput.addEventListener('change', function() {
            const value = parseInt(this.value) || 1;
            if (value < 1) {
                this.value = 1;
            }
            updateCreditControls();
        });
    }
}

// Increment credit amount
function incrementCredit() {
    const creditInput = document.getElementById('credit-amount');
    if (creditInput) {
        const currentValue = parseInt(creditInput.value) || 1;
        creditInput.value = currentValue + 1;
        updateCreditControls();
    }
}

// Decrement credit amount
function decrementCredit() {
    const creditInput = document.getElementById('credit-amount');
    if (creditInput) {
        const currentValue = parseInt(creditInput.value) || 1;
        if (currentValue > 1) {
            creditInput.value = currentValue - 1;
            updateCreditControls();
        }
    }
}

// Update credit control buttons state
function updateCreditControls() {
    const creditInput = document.getElementById('credit-amount');
    const decrementBtn = document.querySelector('.credit-control-btn:first-child');
    
    if (creditInput && decrementBtn) {
        const currentValue = parseInt(creditInput.value) || 1;
        decrementBtn.disabled = currentValue <= 1;
    }
}

// Reset credit amount to default
function resetCreditAmount() {
    const creditInput = document.getElementById('credit-amount');
    if (creditInput) {
        creditInput.value = 1;
        updateCreditControls();
    }
}

// Modified validateCardForm to handle all modes
function validateCardForm() {
    const modal = document.getElementById('add-card-modal');
    const modalMode = modal ? modal.getAttribute('data-mode') : null;
    
    if (modalMode === 'buy-credits') {
        return validateBuyCreditsForm();
    } else if (modalMode === 'manage-plan') {
        return validateManagePlanForm();
    } else {
        return validateAddCardForm();
    }
}

// Validate Buy Credits form
function validateBuyCreditsForm() {
    let isValid = true;
    
    // Clear previous errors
    clearCardFormErrors();
    
    // Validate credit amount
    const creditAmount = document.getElementById('credit-amount').value.trim();
    if (!creditAmount || parseInt(creditAmount) < 1) {
        showToast('Please enter a valid credit amount.');
        isValid = false;
    }
    
    // Validate card number
    const cardNumber = document.getElementById('card-number').value.trim();
    if (!cardNumber || cardNumber.length < 16) {
        showFieldError('card-number', 'Your card number is incomplete.');
        isValid = false;
    }
    
    // Validate expiry date
    const expiryDate = document.getElementById('expiry-date').value.trim();
    if (!expiryDate || !isValidExpiryDate(expiryDate)) {
        showFieldError('expiry-date', 'Your card\'s expiry date is incomplete.');
        isValid = false;
    }
    
    // Validate security code
    const cvc = document.getElementById('cvc').value.trim();
    if (!cvc || cvc.length < 3) {
        showFieldError('cvc', 'Your card\'s security code is incomplete.');
        isValid = false;
    }
    
    // Validate ZIP code
    const zip = document.getElementById('zip').value.trim();
    if (!zip || zip.length < 5) {
        showFieldError('zip', 'Your ZIP is invalid.');
        isValid = false;
    }
    
    if (isValid) {
        // Simulate payment processing
        const creditAmount = document.getElementById('credit-amount').value;
        showToast(`Processing payment for ${creditAmount} credits...`);
        
        // Close modal after successful validation
        setTimeout(() => {
            closeAddCardModal();
            showToast('Payment successful! Credits have been added to your account.');
        }, 2000);
    } else {
        showToast('Please fix the errors above.');
    }
    
    return isValid;
}

// Validate Manage Plan form
function validateManagePlanForm() {
    let isValid = true;
    
    // Clear previous errors
    clearCardFormErrors();
    
    // Validate credit amount
    const creditAmount = document.getElementById('credit-amount').value.trim();
    if (!creditAmount || parseInt(creditAmount) < 1) {
        showToast('Please enter a valid credit amount.');
        isValid = false;
    }
    
    // Validate payment method selection
    const modal = document.getElementById('add-card-modal');
    const selectedPaymentMethod = modal ? modal.getAttribute('data-payment-method') : null;
    if (!selectedPaymentMethod) {
        showToast('Please select a payment method.');
        isValid = false;
    }
    
    // If card is selected, validate card details
    if (selectedPaymentMethod === 'card') {
        // Validate card number
        const cardNumber = document.getElementById('card-number').value.trim();
        if (!cardNumber || cardNumber.length < 16) {
            showFieldError('card-number', 'Your card number is incomplete.');
            isValid = false;
        }
        
        // Validate expiry date
        const expiryDate = document.getElementById('expiry-date').value.trim();
        if (!expiryDate || !isValidExpiryDate(expiryDate)) {
            showFieldError('expiry-date', 'Your card\'s expiry date is incomplete.');
            isValid = false;
        }
        
        // Validate security code
        const cvc = document.getElementById('cvc').value.trim();
        if (!cvc || cvc.length < 3) {
            showFieldError('cvc', 'Your card\'s security code is incomplete.');
            isValid = false;
        }
        
        // Validate ZIP code
        const zip = document.getElementById('zip').value.trim();
        if (!zip || zip.length < 5) {
            showFieldError('zip', 'Your ZIP is invalid.');
            isValid = false;
        }
    }
    
    if (isValid) {
        // Simulate subscription processing
        const planName = modal ? modal.getAttribute('data-plan-name') : '';
        const creditAmount = document.getElementById('credit-amount').value;
        const paymentMethod = selectedPaymentMethod === 'card' ? 'Card' : 'Cash App Pay';
        
        showToast(`Processing subscription to ${planName} with ${creditAmount} credits via ${paymentMethod}...`);
        
        // Close modal after successful validation
        setTimeout(() => {
            closeAddCardModal();
            showToast('Subscription successful! Your plan has been activated.');
        }, 2000);
    } else {
        showToast('Please fix the errors above.');
    }
    
    return isValid;
}

// Validate Add Card form (original function renamed)
function validateAddCardForm() {
    let isValid = true;
    
    // Clear previous errors
    clearCardFormErrors();
    
    // Validate card number
    const cardNumber = document.getElementById('card-number').value.trim();
    if (!cardNumber || cardNumber.length < 16) {
        showFieldError('card-number', 'Your card number is incomplete.');
        isValid = false;
    }
    
    // Validate expiry date
    const expiryDate = document.getElementById('expiry-date').value.trim();
    if (!expiryDate || !isValidExpiryDate(expiryDate)) {
        showFieldError('expiry-date', 'Your card\'s expiry date is incomplete.');
        isValid = false;
    }
    
    // Validate security code
    const cvc = document.getElementById('cvc').value.trim();
    if (!cvc || cvc.length < 3) {
        showFieldError('cvc', 'Your card\'s security code is incomplete.');
        isValid = false;
    }
    
    // Validate ZIP code
    const zip = document.getElementById('zip').value.trim();
    if (!zip || zip.length < 5) {
        showFieldError('zip', 'Your ZIP is invalid.');
        isValid = false;
    }
    
    // Show toast with first error
    if (!isValid) {
        showToast('Your card number is incomplete.');
    } else {
        showToast('Card added successfully!');
        closeAddCardModal();
    }
    
    return isValid;
}

// Show field error
function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + '-error');
    
    if (field) {
        field.classList.add('error');
    }
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
}

// Clear all card form errors
function clearCardFormErrors() {
    const fields = ['card-number', 'expiry-date', 'cvc', 'zip'];
    
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + '-error');
        
        if (field) {
            field.classList.remove('error');
        }
        
        if (errorElement) {
            errorElement.classList.remove('show');
            errorElement.textContent = '';
        }
    });
}

// Validate expiry date format (MM/YY)
function isValidExpiryDate(date) {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regex.test(date)) return false;
    
    const [month, year] = date.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expYear = parseInt(year);
    const expMonth = parseInt(month);
    
    if (expYear < currentYear) return false;
    if (expYear === currentYear && expMonth < currentMonth) return false;
    
    return true;
}

// Show toast notification
function showToast(message) {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// Create Album Modal Functions
function openCreateAlbumModal() {
    const modal = document.getElementById('create-album-modal');
    if (modal) {
        modal.classList.add('active');
        // Focus on the input field
        const albumTitleInput = document.getElementById('album-title');
        if (albumTitleInput) {
            albumTitleInput.focus();
        }
    }
}

function closeCreateAlbumModal() {
    const modal = document.getElementById('create-album-modal');
    if (modal) {
        modal.classList.remove('active');
        // Clear the form
        const albumTitleInput = document.getElementById('album-title');
        if (albumTitleInput) {
            albumTitleInput.value = '';
        }
        // Clear any error messages
        const errorElement = document.getElementById('album-title-error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }
}

function createAlbum() {
    const albumTitleInput = document.getElementById('album-title');
    const albumTitle = albumTitleInput ? albumTitleInput.value.trim() : '';
    const errorElement = document.getElementById('album-title-error');
    
    // Validate album title
    if (!albumTitle) {
        if (errorElement) {
            errorElement.textContent = 'Album title is required';
            errorElement.classList.add('show');
        }
        return;
    }
    
    if (albumTitle.length < 3) {
        if (errorElement) {
            errorElement.textContent = 'Album title must be at least 3 characters long';
            errorElement.classList.add('show');
        }
        return;
    }
    
    // Clear any previous errors
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
    }
    
    // Here you would typically make an API call to create the album
    // For now, we'll just show a success message and close the modal
    showToast(`Album "${albumTitle}" created successfully!`);
    closeCreateAlbumModal();
    
    // You could also add the new album to the table here
    // addAlbumToTable(albumTitle);
}

// Initialize Create Album functionality
function initializeCreateAlbum() {
    const createAlbumBtn = document.querySelector('.create-album-btn');
    if (createAlbumBtn) {
        createAlbumBtn.addEventListener('click', openCreateAlbumModal);
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('create-album-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeCreateAlbumModal();
            }
        });
    }
    
    // Handle Enter key in album title input
    const albumTitleInput = document.getElementById('album-title');
    if (albumTitleInput) {
        albumTitleInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                createAlbum();
            }
        });
    }
}

// Album Settings Functions
function openAlbumSettings(albumTitle) {
  // Show the settings view (this will replace the current content)
  showAlbumSettingsView(albumTitle);
}

function showAlbumSettingsView(albumTitle) {
  const albumsContent = document.getElementById('albums-content');
  
  // Create settings view HTML
  const settingsHTML = `
    <div class="album-settings-view">
      <div class="album-settings-header">
        <h3 class="album-settings-title">${albumTitle}</h3>
        <button class="btn btn-primary edit-title-btn" onclick="editAlbumTitle('${albumTitle}')">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 16px; height: 16px; margin-right: 8px;">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
          Edit Title
        </button>
      </div>
      
      <div class="album-settings-content">
        <div class="album-settings-section">
          <div class="album-settings-item">
            <span class="album-settings-label">Date: ${getAlbumCreatedDate(albumTitle)}</span>
          </div>
        </div>
        
        <div class="album-settings-section">
          <h4 class="album-settings-subtitle">Visibility</h4>
          <div class="album-settings-options">
            <label class="radio-option">
              <input type="radio" name="visibility-${albumTitle.replace(/\s+/g, '-')}" value="public" ${getAlbumVisibility(albumTitle) === 'public' ? 'checked' : ''}>
              <span class="radio-label">Public</span>
            </label>
            <label class="radio-option">
              <input type="radio" name="visibility-${albumTitle.replace(/\s+/g, '-')}" value="private" ${getAlbumVisibility(albumTitle) === 'private' ? 'checked' : ''}>
              <span class="radio-label">Private</span>
            </label>
          </div>
        </div>
        
        <div class="album-settings-section">
          <h4 class="album-settings-subtitle">Permissions</h4>
          
          <div class="permissions-subsection">
            <h5 class="permissions-subtitle">Anonymous</h5>
            <div class="album-settings-options">
              <label class="radio-option">
                <input type="radio" name="anonymous-${albumTitle.replace(/\s+/g, '-')}" value="not-available" ${getAlbumAnonymousPermission(albumTitle) === 'not-available' ? 'checked' : ''}>
                <span class="radio-label">Not available</span>
              </label>
              <label class="radio-option">
                <input type="radio" name="anonymous-${albumTitle.replace(/\s+/g, '-')}" value="can-contribute-view" ${getAlbumAnonymousPermission(albumTitle) === 'can-contribute-view' ? 'checked' : ''}>
                <span class="radio-label">Can contribute + view</span>
              </label>
              <label class="radio-option">
                <input type="radio" name="anonymous-${albumTitle.replace(/\s+/g, '-')}" value="view-only" ${getAlbumAnonymousPermission(albumTitle) === 'view-only' ? 'checked' : ''}>
                <span class="radio-label">View only</span>
              </label>
            </div>
          </div>
          
          <div class="permissions-subsection">
            <h5 class="permissions-subtitle">Small Group</h5>
            <div class="album-settings-options">
              <label class="radio-option">
                <input type="radio" name="small-group-${albumTitle.replace(/\s+/g, '-')}" value="not-available" ${getAlbumSmallGroupPermission(albumTitle) === 'not-available' ? 'checked' : ''}>
                <span class="radio-label">Not available</span>
              </label>
              <label class="radio-option">
                <input type="radio" name="small-group-${albumTitle.replace(/\s+/g, '-')}" value="can-contribute-view" ${getAlbumSmallGroupPermission(albumTitle) === 'can-contribute-view' ? 'checked' : ''}>
                <span class="radio-label">Can contribute + view</span>
              </label>
              <label class="radio-option">
                <input type="radio" name="small-group-${albumTitle.replace(/\s+/g, '-')}" value="view-only" ${getAlbumSmallGroupPermission(albumTitle) === 'view-only' ? 'checked' : ''}>
                <span class="radio-label">View only</span>
              </label>
            </div>
          </div>
          
          <div class="permissions-subsection">
            <h5 class="permissions-subtitle">Members of Small Group</h5>
            <div class="members-table">
              <div class="member-row">
                <span class="member-name">john.doe@example.com</span>
                <span class="member-role">Admin</span>
                <button class="btn btn-danger btn-sm member-remove-btn">Remove</button>
              </div>
              <div class="member-row">
                <span class="member-name">jane.smith@example.com</span>
                <span class="member-role">Member</span>
                <button class="btn btn-danger btn-sm member-remove-btn">Remove</button>
              </div>
            </div>
            <button class="btn btn-primary add-member-btn">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 16px; height: 16px; margin-right: 8px;">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              Add New Member
            </button>
          </div>
        </div>
        
        <div class="album-settings-section">
          <h4 class="album-settings-subtitle">Email notifications</h4>
          <div class="album-settings-options">
            <label class="radio-option">
              <input type="radio" name="email-${albumTitle.replace(/\s+/g, '-')}" value="subscribe" ${getAlbumEmailNotifications(albumTitle) === 'subscribe' ? 'checked' : ''}>
              <span class="radio-label">Subscribe</span>
            </label>
            <label class="radio-option">
              <input type="radio" name="email-${albumTitle.replace(/\s+/g, '-')}" value="unsubscribe" ${getAlbumEmailNotifications(albumTitle) === 'unsubscribe' ? 'checked' : ''}>
              <span class="radio-label">Unsubscribe</span>
            </label>
          </div>
        </div>
        
        <div class="album-settings-actions">
          <button class="btn btn-secondary" onclick="closeAlbumSettings()">Back to Albums</button>
          <button class="btn btn-primary" onclick="saveAlbumSettings('${albumTitle}')">Save Changes</button>
        </div>
      </div>
    </div>
  `;
  
  // Replace the content instead of appending
  albumsContent.innerHTML = settingsHTML;
}

function closeAlbumSettings() {
  const albumsContent = document.getElementById('albums-content');
  
  // Restore the original albums content
  albumsContent.innerHTML = `
    <div class="albums-header">
      <button class="btn btn-primary create-album-btn">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Create Album
      </button>
    </div>
    
    <div class="albums-table-container">
      <table class="albums-table">
        <thead>
          <tr>
            <th>Album Title</th>
            <th>Setting</th>
            <th>Open</th>
            <th>Slideshow page</th>
            <th>Re-instate</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Summer Vacation 2024</td>
            <td>
              <button class="btn btn-secondary btn-sm" onclick="openAlbumSettings('Summer Vacation 2024')">Settings</button>
            </td>
            <td>
              <button class="btn btn-primary btn-sm">Open</button>
            </td>
            <td>
              <button class="btn btn-secondary btn-sm">View</button>
            </td>
            <td>
              <button class="btn btn-secondary btn-sm">Re-instate</button>
            </td>
            <td>
              <button class="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
          <tr>
            <td>Family Photos</td>
            <td>
              <button class="btn btn-secondary btn-sm" onclick="openAlbumSettings('Family Photos')">Settings</button>
            </td>
            <td>
              <button class="btn btn-primary btn-sm">Open</button>
            </td>
            <td>
              <button class="btn btn-secondary btn-sm">View</button>
            </td>
            <td>
              <button class="btn btn-secondary btn-sm">Re-instate</button>
            </td>
            <td>
              <button class="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
          <tr>
            <td>Work Portfolio</td>
            <td>
              <button class="btn btn-secondary btn-sm" onclick="openAlbumSettings('Work Portfolio')">Settings</button>
            </td>
            <td>
              <button class="btn btn-primary btn-sm">Open</button>
            </td>
            <td>
              <button class="btn btn-secondary btn-sm">View</button>
            </td>
            <td>
              <button class="btn btn-secondary btn-sm">Re-instate</button>
            </td>
            <td>
              <button class="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function editAlbumTitle(currentTitle) {
  const newTitle = prompt('Enter new album title:', currentTitle);
  if (newTitle && newTitle.trim() !== '' && newTitle !== currentTitle) {
    // Update the title in the settings view
    const titleElement = document.querySelector('.album-settings-title');
    if (titleElement) {
      titleElement.textContent = newTitle;
    }
    
    // Update the title in the table
    updateAlbumTitleInTable(currentTitle, newTitle);
    
    // Show success message
    showToast('Album title updated successfully!');
  }
}

function updateAlbumTitleInTable(oldTitle, newTitle) {
  // Find and update the album title in the table
  const tableRows = document.querySelectorAll('.albums-table tbody tr');
  tableRows.forEach(row => {
    const titleCell = row.querySelector('td:first-child');
    if (titleCell && titleCell.textContent === oldTitle) {
      titleCell.textContent = newTitle;
    }
  });
}

function saveAlbumSettings(albumTitle) {
  // Get the selected values
  const visibility = document.querySelector(`input[name="visibility-${albumTitle.replace(/\s+/g, '-')}"]:checked`)?.value;
  const emailNotifications = document.querySelector(`input[name="email-${albumTitle.replace(/\s+/g, '-')}"]:checked`)?.value;
  const anonymousPermission = document.querySelector(`input[name="anonymous-${albumTitle.replace(/\s+/g, '-')}"]:checked`)?.value;
  const smallGroupPermission = document.querySelector(`input[name="small-group-${albumTitle.replace(/\s+/g, '-')}"]:checked`)?.value;
  
  // Save the settings (in a real app, this would be sent to the server)
  saveAlbumSettingsToStorage(albumTitle, visibility, emailNotifications, anonymousPermission, smallGroupPermission);
  
  // Show success message
  showToast('Album settings saved successfully!');
  
  // Close settings and return to albums view
  closeAlbumSettings();
}

function getAlbumCreatedDate(albumTitle) {
  // In a real app, this would come from the server
  // For now, return a mock date
  const dates = {
    'Summer Vacation 2024': '2024-06-15',
    'Family Photos': '2024-05-20',
    'Work Portfolio': '2024-04-10'
  };
  return dates[albumTitle] || '2024-01-01';
}

function getAlbumVisibility(albumTitle) {
  // In a real app, this would come from the server
  // For now, return a default value
  return 'public';
}

function getAlbumEmailNotifications(albumTitle) {
  // In a real app, this would come from the server
  // For now, return a default value
  return 'subscribe';
}

function getAlbumAnonymousPermission(albumTitle) {
  // In a real app, this would come from the server
  // For now, return a default value
  return 'not-available';
}

function getAlbumSmallGroupPermission(albumTitle) {
  // In a real app, this would come from the server
  // For now, return a default value
  return 'view-only';
}

function saveAlbumSettingsToStorage(albumTitle, visibility, emailNotifications, anonymousPermission, smallGroupPermission) {
  // In a real app, this would be sent to the server
  // For now, just log the values
  console.log('Saving settings for album:', albumTitle, {
    visibility,
    emailNotifications,
    anonymousPermission,
    smallGroupPermission
  });
}

// Initialize album settings functionality
function initializeAlbumSettings() {
  // Add click event listeners to all settings buttons
  const settingsButtons = document.querySelectorAll('.albums-table .btn-secondary');
  settingsButtons.forEach(button => {
    if (button.textContent === 'Settings') {
      button.addEventListener('click', function() {
        const albumTitle = this.closest('tr').querySelector('td:first-child').textContent;
        openAlbumSettings(albumTitle);
      });
    }
  });
} 
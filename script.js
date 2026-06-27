// ============================================
// EMAILJS CONFIGURATION - UPDATE THESE!
// ============================================
const EMAILJS_SERVICE_ID = 'service_ww294wn'; // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'template_52o5x3c'; // Replace with your Template ID
const EMAILJS_PUBLIC_KEY = 'OUs-QKNM9Rywnvh3v'; // Replace with your Public Key
const YOUR_EMAIL = 'luayliendon@gmail.com'; // Replace with your Gmail

// Initialize EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

console.log('EmailJS initialized');

// ============================================
// FLOATING HEARTS ANIMATION
// ============================================
function createFloatingHearts() {
    const heartsContainer = document.getElementById('heartsContainer');
    if (!heartsContainer) {
        console.error('Hearts container not found');
        return;
    }

    const hearts = ['💕', '❤️', '💖', '💗', '💝'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (5 + Math.random() * 4) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';

        heartsContainer.appendChild(heart);

        setTimeout(() => heart.remove(), 10000);
    }

    // Create hearts every 800ms
    setInterval(createHeart, 800);
    console.log('Floating hearts animation started');
}

// ============================================
// SET MINIMUM DATE (TODAY)
// ============================================
function setMinimumDate() {
    const dateInput = document.getElementById('dateChosen');
    if (!dateInput) {
        console.error('Date input not found');
        return;
    }

    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    console.log('Minimum date set to:', today);
}

// ============================================
// VALIDATE EMAIL
// ============================================
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// FORMAT DATE FOR DISPLAY
// ============================================
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString + 'T00:00:00').toLocaleDateString('en-US', options);
}

// ============================================
// FORM SUBMISSION
// ============================================
document.getElementById('invitationForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('Form submitted');

    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');

    // Validate form elements exist
    if (!submitBtn || !successMessage || !errorMessage) {
        console.error('Form elements not found');
        return;
    }

    // Hide messages
    successMessage.classList.remove('show');
    errorMessage.classList.remove('show');

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.classList.add('loading');

    try {
        // Get form data with validation
        const yourName = document.getElementById('yourName').value.trim();
        const dateChosen = document.getElementById('dateChosen').value;
        const activityChecked = document.querySelector('input[name="activity"]:checked');
        const outfitChecked = document.querySelector('input[name="outfit"]:checked');
        const colorChecked = document.querySelector('input[name="color"]:checked');
        const message = document.getElementById('message').value.trim();

        // Validate all required fields
        if (!yourName) {
            throw new Error('Please enter your name');
        }
        if (!dateChosen) {
            throw new Error('Please select a date');
        }
        if (!activityChecked) {
            throw new Error('Please select an activity');
        }
        if (!outfitChecked) {
            throw new Error('Please select an outfit');
        }
        if (!colorChecked) {
            throw new Error('Please select a color');
        }

        console.log('All validations passed');

        // Prepare form data
        const formData = {
            from_name: yourName,
            from_email: yourName.replace(/\s+/g, '.').toLowerCase() + '@response.local',
            date_chosen: formatDate(dateChosen),
            activity_type: activityChecked.value,
            outfit_choice: outfitChecked.value,
            color_preference: colorChecked.value,
            message: message || 'No message added',
            to_email: YOUR_EMAIL,
            timestamp: new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            })
        };

        console.log('Sending email with data:', formData);

        // Send email via EmailJS
        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            formData
        );

        console.log('EmailJS Response:', response);

        if (response.status === 200) {
            console.log('Email sent successfully');
            
            // Success!
            successMessage.classList.add('show');
            document.getElementById('invitationForm').reset();
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');

            // Celebrate with extra hearts
            celebrateSuccess();

            // Optional: Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            throw new Error('Email service returned an error');
        }
    } catch (error) {
        console.error('Error occurred:', error);
        
        let errorMessage_text = error.text || error.message || 'Failed to send. Please try again.';
        
        // Friendly error messages
        if (error.message === 'Invalid email address') {
            errorMessage_text = 'Invalid email configuration. Please contact support.';
        } else if (error.message.includes('EmailJS')) {
            errorMessage_text = 'Email service is unavailable. Please check your internet connection.';
        }
        
        errorText.textContent = `❌ ${errorMessage_text}`;
        errorMessage.classList.add('show');
        submitBtn.disabled = false;
        submitBtn.classList.remove('loading');

        // Scroll to error message
        errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
});

// ============================================
// CELEBRATE SUCCESS WITH HEARTS
// ============================================
function celebrateSuccess() {
    const heartsContainer = document.getElementById('heartsContainer');
    if (!heartsContainer) return;

    const celebrationHearts = ['💕', '💖', '✨', '🎉', '💝', '🌹', '💐'];

    console.log('Celebrating success');

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = celebrationHearts[Math.floor(Math.random() * celebrationHearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.fontSize = (Math.random() * 2 + 2) + 'rem';
            heart.style.animationDuration = (3 + Math.random() * 2) + 's';
            heart.style.opacity = Math.random() * 0.7 + 0.3;

            heartsContainer.appendChild(heart);

            setTimeout(() => heart.remove(), 5000);
        }, i * 50);
    }
}

// ============================================
// INITIALIZE ON PAGE LOAD
// ============================================
window.addEventListener('load', () => {
    console.log('Page loaded, initializing...');
    createFloatingHearts();
    setMinimumDate();
});

// ============================================
// EASTER EGG: TYPING EFFECT ON HOVER
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header h1');
    if (!header) {
        console.error('Header not found');
        return;
    }

    const originalText = header.textContent;
    let isTyping = false;

    header.addEventListener('mouseenter', () => {
        if (!isTyping) {
            isTyping = true;
            typeEffect(header, originalText, () => {
                isTyping = false;
            });
        }
    });

    header.addEventListener('mouseleave', () => {
        header.textContent = originalText;
        isTyping = false;
    });

    console.log('Typing effect initialized');
});

function typeEffect(element, text, callback) {
    let index = 0;
    element.textContent = '';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50);
        } else {
            if (callback) callback();
        }
    }

    type();
}

// ============================================
// FORM VALIDATION IN REAL-TIME
// ============================================
document.getElementById('invitationForm').addEventListener('change', () => {
    const submitBtn = document.getElementById('submitBtn');
    const form = document.getElementById('invitationForm');

    if (!submitBtn || !form) return;

    // Check if all required fields are filled
    const yourName = document.getElementById('yourName').value.trim();
    const dateChosen = document.getElementById('dateChosen').value;
    const activityChecked = document.querySelector('input[name="activity"]:checked');
    const outfitChecked = document.querySelector('input[name="outfit"]:checked');
    const colorChecked = document.querySelector('input[name="color"]:checked');

    const isFormValid = yourName && dateChosen && activityChecked && outfitChecked && colorChecked;

    if (isFormValid) {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.style.cursor = 'pointer';
    } else {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.6';
        submitBtn.style.cursor = 'not-allowed';
    }
});

// ============================================
// INPUT FIELD ANIMATIONS
// ============================================
document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'scale(1)';
    });
});

document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', () => {
        const label = radio.closest('.option-label') || radio.closest('.color-option');
        if (label) {
            label.style.animation = 'none';
            setTimeout(() => {
                label.style.animation = 'pulse 0.4s ease-out';
            }, 10);
        }
    });
});
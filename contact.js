// AOS initialization
if (typeof AOS !== 'undefined') {
    AOS.init({
        once: true,
        duration: 1000,
        offset: 100,
        delay: 50,
    });
}

// Firebase imports (ensure this path is correct in your module setup)
import { db, doc, setDoc } from "./config/config.js";

// Show success message from Formspree OR from our own Firebase submission
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('success') === '' || urlParams.get('firebase') === 'true') {
    const form = document.querySelector('form');
    if (form) {
        form.innerHTML = `
            <div class="text-center py-5 text-white">
                <i class="fas fa-check-circle text-success display-1 mb-4"></i>
                <h2>Thank You!</h2>
                <p class="fs-4">Your message has been sent successfully.<br>I'll reply within 24 hours.</p>
                <a href="." class="btn btn-outline-light mt-3">Send Another Message</a>
            </div>`;
        form.classList.add('was-validated');
    }
}

// Enhanced sendMessage function
window.sendMessage = async (event) => {
    if (event) event.preventDefault();

    // Disable submit button to prevent double submission
    const submitBtn = document.querySelector('button[type="submit"], input[type="submit"]');
    const originalText = submitBtn?.innerHTML || submitBtn?.value || 'Sending...';
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Sending...';
    }

    try {
        // Safely get form values
        const getValue = (name) => {
            const el = document.querySelector(`[name="${name}"]`);
            return el ? el.value.trim() : '';
        };

        const name = getValue('name');
        const email = getValue('_replyto');
        const company = getValue('company');
        const service = getValue('service');
        const budget = getValue('budget');
        const message = getValue('message');

        // Basic validation
        if (!name || !email || !message) {
            throw new Error('Please fill in all required fields: Name, Email, and Message.');
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            throw new Error('Please enter a valid email address.');
        }

        // Generate unique Firestore document ID
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substr(2, 9);
        const docId = `${name.replace(/\s+/g, '_')}_${timestamp}_${randomId}`;

        // Save to Firebase Firestore
        await setDoc(doc(db, "contact_messages", docId), {
            name,
            email,
            company: company || 'N/A',
            service: service || 'Not specified',
            budget: budget || 'Not specified',
            message,
            timestamp: new Date().toISOString(),
            submittedAt: timestamp,
        });

        console.log('Message saved to Firebase:', docId);

        // Redirect with success flag (prevents form resubmission on refresh)
        const newUrl = new URL(window.location);
        newUrl.searchParams.set('firebase', 'true');
        newUrl.searchParams.delete('success'); // clear Formspree param
        window.history.replaceState({}, '', newUrl);

        // Show success UI
        showSuccessMessage();

    } catch (error) {
        console.error('Firebase submission error:', error);
        showErrorMessage(error.message || 'Something went wrong. Please try again.');

    } finally {
        // Re-enable button
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    }
};

// Success UI
function showSuccessMessage() {
    const form = document.querySelector('form');
    if (!form) return;

    form.innerHTML = `
        <div class="text-center py-5 text-white">
            <i class="fas fa-check-circle text-success display-1 mb-4"></i>
            <h2>Thank You, ${document.querySelector('[name="name"]')?.value.split(' ')[0] || 'there'}!</h2>
            <p class="fs-4">Your message has been sent successfully.<br>I'll get back to you within 24 hours.</p>
            <a href="." class="btn btn-outline-light mt-4">Send Another Message</a>
        </div>`;
}

// Error UI
function showErrorMessage(msg) {
    // Remove any existing alerts
    document.querySelectorAll('.custom-alert').forEach(el => el.remove());

    const alert = document.createElement('div');
    alert.className = 'alert alert-danger custom-alert mt-3';
    alert.role = 'alert';
    alert.innerHTML = `<strong>Error:</strong> ${msg}`;

    const form = document.querySelector('form');
    if (form) {
        form.appendChild(alert);
        setTimeout(() => alert.remove(), 8000);
    }
}

// Optional: Auto-attach to form if not already done in HTML
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form && !form.dataset.listenerAttached) {
        form.addEventListener('submit', window.sendMessage);
        form.dataset.listenerAttached = 'true';
    }
});
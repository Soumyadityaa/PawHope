document.addEventListener('DOMContentLoaded', () => {

    // Elements
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    const togglePasswordBtns = document.querySelectorAll('.password-toggle');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    const closeModals = document.querySelectorAll('.close-modal');

    // Toast Notification System
    const showToast = (message, type = 'success') => {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<strong>${type === 'success' ? '✓' : '⚠'}</strong> <span>${message}</span>`;
        
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // Password Show/Hide Toggle
    togglePasswordBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const input = passwordInputs[index];
            if (input.type === 'password') {
                input.type = 'text';
                btn.textContent = 'Hide';
                btn.setAttribute('aria-label', 'Hide password');
            } else {
                input.type = 'password';
                btn.textContent = 'Show';
                btn.setAttribute('aria-label', 'Show password');
            }
        });
    });

    // Login Form Submission (Mock Auth)
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const loginCard = document.querySelector('.auth-form-container');

            // Mock Credentials Check
            if (email === 'demo@pawhope.org' && password === 'Demo@123') {
                // Success
                const mockUser = {
                    name: "Rahul M.",
                    email: "demo@pawhope.org",
                    role: "Donor",
                    joined: "Jan 2026"
                };
                
                localStorage.setItem('pawhopeLoggedIn', 'true');
                localStorage.setItem('pawhopeUser', JSON.stringify(mockUser));
                
                showToast('Login successful. Welcome back!');
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                // Failure
                loginCard.classList.remove('shake');
                void loginCard.offsetWidth; // trigger reflow
                loginCard.classList.add('shake');
                
                showToast('Invalid email or password. Please try again.', 'error');
                document.getElementById('password').value = ''; // clear password for safety
            }
        });
    }

    // Register Form Submission (Mock)
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Account created successfully! Redirecting to login...');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }

    // Forgot Password Modal
    if (forgotPasswordLink && forgotPasswordModal) {
        forgotPasswordLink.addEventListener('click', (e) => {
            e.preventDefault();
            forgotPasswordModal.style.display = 'flex';
        });
    }

    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            if (forgotPasswordModal) forgotPasswordModal.style.display = 'none';
        });
    });

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        if (e.target === forgotPasswordModal) {
            forgotPasswordModal.style.display = 'none';
        }
    });

});
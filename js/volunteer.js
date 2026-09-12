document.addEventListener('DOMContentLoaded', () => {
    
    // Form and Modal Elements
    const volunteerForm = document.getElementById('volunteerForm');
    const successModal = document.getElementById('volunteerSuccessModal');
    const closeModalBtn = document.getElementById('closeVolunteerModal');
    const interestError = document.getElementById('interest-error');

    // Dynamic text elements in modal
    const modalName = document.getElementById('modal-name');
    const modalEmail = document.getElementById('modal-email');

    /* ==========================================================================
       1. Form Submission Handler
       ========================================================================== */
    
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent page reload

            // 1. Custom Validation for Checkboxes
            // The browser's native required attribute doesn't work perfectly across a group of checkboxes.
            const checkboxes = document.querySelectorAll('input[name="interest"]:checked');
            
            if (checkboxes.length === 0) {
                // Show error if no interest is selected
                interestError.style.display = 'block';
                return; // Stop form submission
            } else {
                interestError.style.display = 'none';
            }

            // 2. Gather Data
            const formData = {
                name: document.getElementById('vol-name').value.trim(),
                email: document.getElementById('vol-email').value.trim(),
                phone: document.getElementById('vol-phone').value.trim(),
                city: document.getElementById('vol-city').value.trim(),
                age: document.getElementById('vol-age').value,
                availability: document.getElementById('vol-availability').value,
                experience: document.getElementById('vol-experience').value,
                motivation: document.getElementById('vol-motivation').value.trim(),
                interests: Array.from(checkboxes).map(cb => cb.value),
                dateApplied: new Date().toLocaleDateString('en-IN')
            };

            // 3. Mock Saving to LocalStorage
            // In a real application, you would make a fetch/AJAX request to a backend server here.
            let applications = JSON.parse(localStorage.getItem('pawhope_volunteers')) || [];
            applications.push(formData);
            localStorage.setItem('pawhope_volunteers', JSON.stringify(applications));

            console.log("Mock Volunteer Application Saved:", formData);

            // 4. Update and Show Success Modal
            modalName.innerText = formData.name.split(' ')[0]; // Use first name
            modalEmail.innerText = formData.email;
            
            successModal.style.display = 'flex';
        });
    }

    /* ==========================================================================
       2. Real-time Checkbox Validation (Optional UX Enhancement)
       ========================================================================== */
    const allCheckboxes = document.querySelectorAll('input[name="interest"]');
    allCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            // Hide the error message as soon as the user checks at least one box
            const checkedCount = document.querySelectorAll('input[name="interest"]:checked').length;
            if (checkedCount > 0) {
                interestError.style.display = 'none';
            }
        });
    });

    /* ==========================================================================
       3. Modal Interactions
       ========================================================================== */
    
    // Redirect to home when closing the modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            successModal.style.display = 'none';
            volunteerForm.reset();
            window.location.href = 'index.html';
        });
    }

    // Close modal if clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.style.display = 'none';
            volunteerForm.reset();
            window.location.href = 'index.html';
        }
    });

});
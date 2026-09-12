document.addEventListener('DOMContentLoaded', () => {
    
    // Elements
    const donationForm = document.getElementById('donationForm');
    const amountBtns = document.querySelectorAll('.amount-btn');
    const customAmountInput = document.getElementById('custom-amount');
    const successModal = document.getElementById('successModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const successMessage = document.getElementById('successMessage');

    // State variable for selected amount
    let selectedAmount = 500; // Default matches the HTML active button

    /* ==========================================================================
       1. Amount Selection Logic
       ========================================================================== */
    
    // Handle predefined amount buttons
    amountBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all buttons
            amountBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            e.target.classList.add('active');
            
            // Update selected amount state
            selectedAmount = parseInt(e.target.getAttribute('data-amount'));
            
            // Clear custom input field so it doesn't override the button
            customAmountInput.value = '';
        });
    });

    // Handle custom amount input
    customAmountInput.addEventListener('input', (e) => {
        const val = e.target.value;
        
        if (val && parseInt(val) > 0) {
            // Remove active class from buttons since user is typing a custom amount
            amountBtns.forEach(b => b.classList.remove('active'));
            selectedAmount = parseInt(val);
        } else {
            // If input is cleared, default back to the first button (500)
            amountBtns[0].classList.add('active');
            selectedAmount = parseInt(amountBtns[0].getAttribute('data-amount'));
        }
    });

    /* ==========================================================================
       2. Form Submission & Mock Database (LocalStorage)
       ========================================================================== */
    
    donationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Validate Amount
        if (!selectedAmount || selectedAmount < 100) {
            alert('Please enter a valid donation amount (Minimum ₹100).');
            return;
        }

        // 2. Gather Data
        const donorName = document.getElementById('donor-name').value.trim();
        const donorEmail = document.getElementById('donor-email').value.trim();
        const purpose = document.getElementById('donation-purpose').value;
        const isAnonymous = document.getElementById('anonymous-donation').checked;
        
        // Generate a mock transaction ID and current date
        const transactionId = 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        const date = new Date().toLocaleDateString('en-IN', { 
            year: 'numeric', month: 'short', day: 'numeric' 
        });

        // Create donation record object
        const donationRecord = {
            id: transactionId,
            name: isAnonymous ? 'Anonymous Donor' : donorName,
            email: donorEmail,
            amount: selectedAmount,
            purpose: purpose,
            date: date
        };

        // 3. Save to LocalStorage (Mocking a Database)
        // Retrieve existing donations or create an empty array
        let existingDonations = JSON.parse(localStorage.getItem('pawhope_donations')) || [];
        
        // Add the new donation to the array
        existingDonations.push(donationRecord);
        
        // Save back to LocalStorage
        localStorage.setItem('pawhope_donations', JSON.stringify(existingDonations));

        // 4. Update and Show Success Modal
        successMessage.innerHTML = `Your simulated donation of <strong>₹${selectedAmount.toLocaleString('en-IN')}</strong> was successful.`;
        successModal.style.display = 'flex';
        
        // Reset form
        donationForm.reset();
        amountBtns.forEach(b => b.classList.remove('active'));
        amountBtns[0].classList.add('active');
        selectedAmount = 500;
    });

    /* ==========================================================================
       3. Modal Interactions
       ========================================================================== */
    
    // Redirect to Dashboard when closing the modal
    closeModalBtn.addEventListener('click', () => {
        successModal.style.display = 'none';
        
        // Usually, you would redirect to a dashboard.html page here.
        // For testing purposes, you can change this URL to your local dashboard path if it exists.
        // window.location.href = 'dashboard.html'; 
        
        alert("Redirecting to Donor Dashboard... (Create dashboard.html to view saved localStorage data)");
    });

    // Close modal if clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.style.display = 'none';
        }
    });

});
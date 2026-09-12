document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Authentication Guard
       ========================================================================== */
    if (localStorage.getItem("pawhopeLoggedIn") !== "true") {
        alert("Please sign in to access your dashboard.");
        window.location.href = "login.html";
        return;
    }

    /* ==========================================================================
       2. Populate User Data
       ========================================================================== */
    const user = JSON.parse(localStorage.getItem('pawhopeUser'));
    const userNameElements = document.querySelectorAll('.user-name');
    const userAvatar = document.querySelector('.avatar');

    if (user) {
        userNameElements.forEach(el => el.textContent = user.name);
        if (userAvatar) userAvatar.textContent = user.name.charAt(0);
        
        // Populate profile form if it exists
        const profileName = document.getElementById('profile-name');
        const profileEmail = document.getElementById('profile-email');
        if (profileName) profileName.value = user.name;
        if (profileEmail) profileEmail.value = user.email;
    }

    /* ==========================================================================
       3. Sidebar Navigation Logic
       ========================================================================== */
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const dashboardSections = document.querySelectorAll('.dashboard-section');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Ignore logout link
            if (link.id === 'logout-btn') return;

            // Remove active classes
            sidebarLinks.forEach(l => l.classList.remove('active'));
            dashboardSections.forEach(s => s.classList.remove('active'));

            // Add active class
            link.classList.add('active');
            const targetId = link.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    /* ==========================================================================
       4. Mock Data Generation & Injection
       ========================================================================== */
    
    // A. Donations
    const mockDonations = JSON.parse(localStorage.getItem('pawhope_donations')) || [
        { date: '15 Aug 2026', amount: 500, purpose: 'Animal Food', campaign: 'Community Feeding Program', status: 'Completed' },
        { date: '01 Aug 2026', amount: 2000, purpose: 'Medical Care', campaign: 'Emergency Rescue', status: 'Completed' },
        { date: '10 Jul 2026', amount: 10000, purpose: 'Shelter', campaign: 'New Shelter Project', status: 'Completed' }
    ];

    const donationTbody = document.getElementById('donation-tbody');
    const totalDonatedEl = document.getElementById('total-donated');
    const donationCountEl = document.getElementById('donation-count');
    
    let totalDonated = 0;

    if (donationTbody) {
        mockDonations.forEach(donation => {
            totalDonated += parseInt(donation.amount);
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${donation.date}</td>
                <td style="font-weight:bold; color:var(--color-primary);">₹${parseInt(donation.amount).toLocaleString('en-IN')}</td>
                <td>${donation.purpose}</td>
                <td>${donation.campaign || 'General'}</td>
                <td><span class="badge badge-success">${donation.status}</span></td>
            `;
            donationTbody.appendChild(tr);
        });

        if (totalDonatedEl) totalDonatedEl.textContent = `₹${totalDonated.toLocaleString('en-IN')}`;
        if (donationCountEl) donationCountEl.textContent = mockDonations.length;
    }

    // B. Adoption Applications
    const adoptionTbody = document.getElementById('adoption-tbody');
    if (adoptionTbody) {
        adoptionTbody.innerHTML = `
            <tr>
                <td>APP-2026-0042</td>
                <td>Bruno (Dog)</td>
                <td>12 Aug 2026</td>
                <td><span class="badge badge-pending">Under Review</span></td>
            </tr>
        `;
    }

    // C. Volunteer Activity
    const volunteerTbody = document.getElementById('volunteer-tbody');
    if (volunteerTbody) {
        volunteerTbody.innerHTML = `
            <tr>
                <td>Community Feeding Drive</td>
                <td>20 Aug 2026</td>
                <td><span class="badge badge-success">Completed</span></td>
            </tr>
            <tr>
                <td>Animal Awareness Campaign</td>
                <td>05 Sep 2026</td>
                <td><span class="badge badge-pending">Upcoming</span></td>
            </tr>
        `;
    }

    /* ==========================================================================
       5. Logout Logic
       ========================================================================== */
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem("pawhopeLoggedIn");
            // Show toast visually before redirecting
            document.body.innerHTML += `
                <div class="toast-container"><div class="toast success">Logging out safely...</div></div>
            `;
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        });
    }

    /* ==========================================================================
       6. Profile Update Simulator
       ========================================================================== */
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Show custom toast 
            let container = document.querySelector('.toast-container');
            if (!container) {
                container = document.createElement('div');
                container.className = 'toast-container';
                document.body.appendChild(container);
            }
            container.innerHTML = `<div class="toast success"><strong>✓</strong> <span>Profile updated successfully.</span></div>`;
            setTimeout(() => {
                container.innerHTML = '';
            }, 3000);
        });
    }
});
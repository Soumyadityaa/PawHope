document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Mock Database (Animal Data)
       ========================================================================== */
    const animalsData = [
        {
            id: 'A001',
            name: 'Bruno',
            species: 'Dog',
            age: '3 Years',
            location: 'Urban Roadside, Durgapur',
            rescueDate: '15 May 2026',
            condition: 'Fully Recovered',
            rescueStatus: 'In Shelter',
            adoptionStatus: 'Available',
            image: 'images/dogs/bruno.jpg',
            fallbackImg: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
            description: 'Bruno was found severely malnourished near a busy intersection. After months of dedicated care, proper diet, and socialization, he has transformed into an incredibly energetic and affectionate companion. He loves playing fetch and gets along well with other dogs.'
        },
        {
            id: 'A002',
            name: 'Nandini',
            species: 'Cow',
            age: '5 Years',
            location: 'National Highway 19',
            rescueDate: '02 Aug 2026',
            condition: 'Recovering (Leg Injury)',
            rescueStatus: 'Sanctuary Care',
            adoptionStatus: 'Not Applicable',
            image: 'images/cows/nandini.jpg',
            fallbackImg: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=600&q=80',
            description: 'Nandini was struck by a speeding vehicle and suffered a fractured hind leg. Our ambulance team brought her to the sanctuary where she underwent immediate veterinary surgery. She is currently undergoing physical therapy and enjoys eating fresh greens in the sun.'
        },
        {
            id: 'A003',
            name: 'Luna',
            species: 'Cat',
            age: '8 Months',
            location: 'Abandoned Building Pipeline',
            rescueDate: '20 Jul 2026',
            condition: 'Healthy & Vaccinated',
            rescueStatus: 'In Shelter',
            adoptionStatus: 'Available',
            image: 'images/cats/luna.jpg',
            fallbackImg: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
            description: 'Little Luna was trapped inside a narrow drainage pipe for two days before our rescue team extracted her. She was terrified at first, but with gentle handling, she has blossomed into a purring machine who loves to chase feather toys.'
        },
        {
            id: 'A004',
            name: 'Rocky',
            species: 'Dog',
            age: '1.5 Years',
            location: 'Market Marketplace',
            rescueDate: '10 Jun 2026',
            condition: 'Undergoing Skin Treatment',
            rescueStatus: 'Medical Ward',
            adoptionStatus: 'Pending Recovery',
            image: 'images/dogs/rocky.jpg',
            fallbackImg: 'https://images.unsplash.com/photo-1537151608804-ea6f1cb684c3?auto=format&fit=crop&w=600&q=80',
            description: 'Rocky was rescued from the market area suffering from severe mange and skin infections. He is currently receiving medicated baths and antibiotics. Despite his discomfort, he wags his tail for every volunteer who passes by his kennel.'
        },
        {
            id: 'A005',
            name: 'Bella',
            species: 'Cat',
            age: '3 Years',
            location: 'Residential Complex',
            rescueDate: '05 Sep 2026',
            condition: 'Healthy',
            rescueStatus: 'Foster Care',
            adoptionStatus: 'Available',
            image: 'images/cats/bella.jpg',
            fallbackImg: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=600&q=80',
            description: 'Bella is a calm, mature cat who was left behind when her previous owners moved away. She is currently thriving in a foster home, proving to be an independent yet incredibly loving lap cat perfect for a quiet apartment.'
        },
        {
            id: 'A006',
            name: 'Gopal',
            species: 'Cow',
            age: '8 Years',
            location: 'Industrial Area',
            rescueDate: '12 Jan 2026',
            condition: 'Old Age Care',
            rescueStatus: 'Sanctuary Resident',
            adoptionStatus: 'Not Applicable',
            image: 'images/cows/gopal.jpg',
            fallbackImg: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=600&q=80',
            description: 'Gopal is one of our older sanctuary residents. Rescued from wandering near dangerous industrial machinery, he now spends his peaceful days grazing in our open pastures. He requires special easily-digestible food.'
        }
    ];

    /* ==========================================================================
       2. DOM Elements
       ========================================================================== */
    const animalsGrid = document.getElementById('animals-grid');
    const searchInput = document.getElementById('searchInput');
    const filterBtns = document.querySelectorAll('.controls-section .filter-btn');
    
    // Modal Elements
    const modal = document.getElementById('animalModal');
    const closeModal = document.getElementById('closeModal');
    const modalImage = document.getElementById('modalImage');
    const modalBadges = document.getElementById('modalBadges');
    const modalName = document.getElementById('modalName');
    const modalDescription = document.getElementById('modalDescription');
    const modalSpecies = document.getElementById('modalSpecies');
    const modalAge = document.getElementById('modalAge');
    const modalRescueDate = document.getElementById('modalRescueDate');
    const modalLocation = document.getElementById('modalLocation');
    const modalCondition = document.getElementById('modalCondition');
    const modalRescueStatus = document.getElementById('modalRescueStatus');
    const modalAdoptBtn = document.getElementById('modalAdoptBtn');

    /* ==========================================================================
       3. Render Logic
       ========================================================================== */
    
    // Function to get appropriate badge classes based on status
    const getBadgeClass = (status) => {
        if (status === 'Available') return 'available'; // Green (from style.css)
        if (status === 'Not Applicable') return 'bg-light text-main'; // Gray
        return 'recovering'; // Orange (from style.css)
    };

    // Main render function
    const renderAnimals = (data) => {
        animalsGrid.innerHTML = ''; // Clear current grid

        if (data.length === 0) {
            animalsGrid.innerHTML = `
                <div class="no-results">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 1rem; color: #ccc;"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    <h3>No animals found</h3>
                    <p>Try adjusting your filters or search terms.</p>
                </div>
            `;
            return;
        }

        data.forEach(animal => {
            const badgeClass = getBadgeClass(animal.adoptionStatus);
            
            // Build card HTML
            const cardHTML = `
                <div class="animal-card fade-in">
                    <div class="animal-image">
                        <!-- Using onerror to load fallback Unsplash images if local images don't exist yet -->
                        <img src="${animal.image}" alt="${animal.name}" onerror="this.src='${animal.fallbackImg}'">
                        <div class="status-badge ${badgeClass}">Adoption: ${animal.adoptionStatus}</div>
                    </div>
                    <div class="animal-details">
                        <h3>${animal.name}</h3>
                        <ul class="animal-meta">
                            <li><strong>Type:</strong> ${animal.species}</li>
                            <li><strong>Age:</strong> ${animal.age}</li>
                        </ul>
                        <p class="animal-desc" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                            ${animal.condition} - Rescued from ${animal.location.split(',')[0]}.
                        </p>
                        <button class="btn btn-outline view-details-btn" style="width: 100%;" data-id="${animal.id}">
                            View Details
                        </button>
                    </div>
                </div>
            `;
            animalsGrid.insertAdjacentHTML('beforeend', cardHTML);
        });
    };

    /* ==========================================================================
       4. Filter & Search Logic
       ========================================================================== */
    
    let currentFilter = 'All';
    let searchQuery = '';

    const applyFilters = () => {
        let filteredData = animalsData;

        // Apply Category Filter
        if (currentFilter !== 'All') {
            filteredData = filteredData.filter(animal => animal.species === currentFilter);
        }

        // Apply Text Search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filteredData = filteredData.filter(animal => 
                animal.name.toLowerCase().includes(query) || 
                animal.species.toLowerCase().includes(query) ||
                animal.condition.toLowerCase().includes(query)
            );
        }

        renderAnimals(filteredData);
    };

    // Filter Buttons Event Listeners
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // UI Update
            filterBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            // State Update
            currentFilter = e.target.getAttribute('data-filter');
            applyFilters();
        });
    });

    // Search Input Event Listener
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        applyFilters();
    });

    /* ==========================================================================
       5. Modal Logic (Event Delegation)
       ========================================================================== */
    
    // Open Modal
    animalsGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-details-btn')) {
            const animalId = e.target.getAttribute('data-id');
            const animal = animalsData.find(a => a.id === animalId);
            
            if (animal) {
                // Populate Modal Data
                modalImage.style.backgroundImage = `url('${animal.fallbackImg}')`; // Using fallback for reliable demo display
                modalName.innerText = animal.name;
                modalDescription.innerText = animal.description;
                modalSpecies.innerText = animal.species;
                modalAge.innerText = animal.age;
                modalRescueDate.innerText = animal.rescueDate;
                modalLocation.innerText = animal.location;
                modalCondition.innerText = animal.condition;
                modalRescueStatus.innerText = animal.rescueStatus;
                
                // Badges
                const adptBadge = getBadgeClass(animal.adoptionStatus);
                modalBadges.innerHTML = `
                    <span class="status-badge" style="position: static;">${animal.species}</span>
                    <span class="status-badge ${adptBadge}" style="position: static;">Adoption: ${animal.adoptionStatus}</span>
                `;

                // Handle Adoption button visibility
                if (animal.adoptionStatus === 'Available') {
                    modalAdoptBtn.style.display = 'block';
                } else {
                    modalAdoptBtn.style.display = 'none';
                }

                // Show Modal
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            }
        }
    });

    // Close Modal
    const closeAnimalModal = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    };

    closeModal.addEventListener('click', closeAnimalModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeAnimalModal();
        }
    });

    // Allow Esc key to close modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            closeAnimalModal();
        }
    });

    // Add a simple fade-in animation style dynamically for smooth rendering
    const style = document.createElement('style');
    style.innerHTML = `
        .fade-in {
            animation: fadeIn 0.4s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    /* ==========================================================================
       6. Initial Render
       ========================================================================== */
    renderAnimals(animalsData);

});
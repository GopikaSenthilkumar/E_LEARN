document.addEventListener('DOMContentLoaded', function() {
    // Sticky header shadow on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Category tooltips functionality for touch devices
    const categoryCards = document.querySelectorAll('.category-card');
    let activeTooltip = null;

    categoryCards.forEach(card => {
        // For touch devices
        card.addEventListener('touchstart', function(e) {
            e.preventDefault();
            
            // If there's an active tooltip and it's not this one, hide it
            if (activeTooltip && activeTooltip !== this) {
                const tooltip = activeTooltip.querySelector('.category-tooltip');
                tooltip.style.visibility = 'hidden';
                tooltip.style.opacity = '0';
            }
            
            const tooltip = this.querySelector('.category-tooltip');
            
            // Toggle tooltip visibility
            if (tooltip.style.visibility === 'visible') {
                tooltip.style.visibility = 'hidden';
                tooltip.style.opacity = '0';
                activeTooltip = null;
            } else {
                tooltip.style.visibility = 'visible';
                tooltip.style.opacity = '1';
                tooltip.style.bottom = '110%';
                activeTooltip = this;
            }
        });
        
        // Close tooltips when clicking elsewhere
        document.addEventListener('touchstart', function(e) {
            if (activeTooltip && !activeTooltip.contains(e.target)) {
                const tooltip = activeTooltip.querySelector('.category-tooltip');
                tooltip.style.visibility = 'hidden';
                tooltip.style.opacity = '0';
                activeTooltip = null;
            }
        });
        
        // Make sure the card is clickable (navigates to category page)
        card.addEventListener('click', function() {
            // Only navigate if not displaying tooltip (handled by touch event)
            if (!('ontouchstart' in window)) {
                // In a real app, this would navigate to the category page
                alert(`Navigating to ${this.querySelector('h3').textContent} courses`);
            }
        });
    });

    // Login and Signup Modal Functionality
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');
    
    // Open modals
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
    
    signupBtn.addEventListener('click', function(e) {
        e.preventDefault();
        signupModal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });
    
    // Close modals when clicking the X button
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            loginModal.style.display = 'none';
            signupModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
    });
    
    // Close modals when clicking outside the modal content
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (e.target === signupModal) {
            signupModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    // Switch between login and signup
    switchToSignup.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'none';
        signupModal.style.display = 'flex';
    });
    
    switchToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        signupModal.style.display = 'none';
        loginModal.style.display = 'flex';
    });
    
    // Form submission handling
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // In a real app, this would send the data to a server
        console.log('Login attempt:', { email, password });
        
        // Show success message (in a real app, this would happen after server validation)
        alert('Login successful!');
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const fullName = document.getElementById('signup-fullname').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;
        
        // In a real app, this would send the data to a server
        console.log('Signup attempt:', { fullName, email, password });
        
        // Show success message (in a real app, this would happen after server validation)
        alert('Account created successfully! Welcome to EduLearn.');
        signupModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Categories dropdown functionality
    const categoryLink = document.querySelector('nav ul li:first-child a');
    if (categoryLink) {
        // Create dropdown element
        const dropdown = document.createElement('div');
        dropdown.className = 'category-dropdown';
        dropdown.style.display = 'none';
        dropdown.style.position = 'absolute';
        dropdown.style.backgroundColor = '#fff';
        dropdown.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)';
        dropdown.style.borderRadius = '4px';
        dropdown.style.padding = '16px';
        dropdown.style.zIndex = '1000';
        dropdown.style.width = '200px';
        dropdown.style.marginTop = '10px';
        dropdown.innerHTML = `
            <ul style="display: grid; gap: 12px;">
                <li><a href="#" style="display: block; padding: 8px;">Development</a></li>
                <li><a href="#" style="display: block; padding: 8px;">Business</a></li>
                <li><a href="#" style="display: block; padding: 8px;">Finance & Accounting</a></li>
                <li><a href="#" style="display: block; padding: 8px;">IT & Software</a></li>
                <li><a href="#" style="display: block; padding: 8px;">Office Productivity</a></li>
                <li><a href="#" style="display: block; padding: 8px;">Personal Development</a></li>
                <li><a href="#" style="display: block; padding: 8px;">Design</a></li>
                <li><a href="#" style="display: block; padding: 8px;">Marketing</a></li>
                <li><a href="#" style="display: block; padding: 8px;">Photography</a></li>
            </ul>
        `;
        
        document.body.appendChild(dropdown);
        
        // Toggle dropdown when clicking on the category link
        let isDropdownVisible = false;
        categoryLink.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Position the dropdown under the category link
            const rect = categoryLink.getBoundingClientRect();
            dropdown.style.left = rect.left + 'px';
            dropdown.style.top = (rect.bottom + window.scrollY) + 'px';
            
            isDropdownVisible = !isDropdownVisible;
            dropdown.style.display = isDropdownVisible ? 'block' : 'none';
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (e.target !== categoryLink && isDropdownVisible) {
                isDropdownVisible = false;
                dropdown.style.display = 'none';
            }
        });
    }

    // Course card hover effects
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });

        // Add click event
        card.addEventListener('click', function() {
            // In a real app, this would navigate to the course details page
            alert('Course details page would open here');
        });
    });

    // Mobile menu toggle (simplified implementation)
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    mobileMenuButton.style.display = 'none';
    mobileMenuButton.style.background = 'none';
    mobileMenuButton.style.border = 'none';
    mobileMenuButton.style.fontSize = '24px';
    mobileMenuButton.style.cursor = 'pointer';
    
    const headerContainer = document.querySelector('header .container');
    if (headerContainer) {
        headerContainer.insertBefore(mobileMenuButton, headerContainer.firstChild);
        
        // Show menu button on small screens
        function checkScreenSize() {
            if (window.innerWidth <= 768) {
                mobileMenuButton.style.display = 'block';
            } else {
                mobileMenuButton.style.display = 'none';
            }
        }
        
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize(); // Check on load
        
        // Mobile menu functionality
        mobileMenuButton.addEventListener('click', function() {
            const nav = document.querySelector('nav');
            if (nav) {
                if (nav.style.display === 'block') {
                    nav.style.display = 'none';
                } else {
                    nav.style.display = 'block';
                    nav.style.position = 'absolute';
                    nav.style.top = '60px';
                    nav.style.left = '0';
                    nav.style.width = '100%';
                    nav.style.backgroundColor = '#fff';
                    nav.style.padding = '16px';
                    nav.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
                }
            }
        });
    }

    // Search functionality
    const searchForms = document.querySelectorAll('form');
    searchForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            if (input && input.value.trim() !== '') {
                // In a real app, this would perform a search
                alert(`You searched for: ${input.value}`);
            }
        });
    });

    // Add to cart functionality
    const cartIcon = document.querySelector('.fa-shopping-cart');
    if (cartIcon) {
        cartIcon.parentElement.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real app, this would open the cart
            alert('Shopping cart would open here');
        });
    }

    // Create a simple course carousel for featured courses
    createCourseCarousel();
});

// Function to create a simple course carousel like Udemy
function createCourseCarousel() {
    const popularCourses = document.querySelector('.popular-courses');
    if (!popularCourses) return;
    
    // Add carousel navigation
    const sectionHeader = popularCourses.querySelector('.section-header');
    if (sectionHeader) {
        const navButtons = document.createElement('div');
        navButtons.className = 'carousel-nav';
        navButtons.style.display = 'flex';
        navButtons.style.gap = '8px';
        
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevButton.style.width = '40px';
        prevButton.style.height = '40px';
        prevButton.style.borderRadius = '50%';
        prevButton.style.border = '1px solid #1c1d1f';
        prevButton.style.background = 'white';
        prevButton.style.cursor = 'pointer';
        
        const nextButton = document.createElement('button');
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextButton.style.width = '40px';
        nextButton.style.height = '40px';
        nextButton.style.borderRadius = '50%';
        nextButton.style.border = '1px solid #1c1d1f';
        nextButton.style.background = 'white';
        nextButton.style.cursor = 'pointer';
        
        navButtons.appendChild(prevButton);
        navButtons.appendChild(nextButton);
        
        sectionHeader.appendChild(navButtons);
        
        // Carousel functionality
        const courseGrid = popularCourses.querySelector('.course-grid');
        let scrollAmount = 0;
        const cardWidth = 270; // card width + gap
        
        prevButton.addEventListener('click', function() {
            scrollAmount = Math.max(scrollAmount - cardWidth, 0);
            courseGrid.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        nextButton.addEventListener('click', function() {
            const maxScroll = courseGrid.scrollWidth - courseGrid.clientWidth;
            scrollAmount = Math.min(scrollAmount + cardWidth, maxScroll);
            courseGrid.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // Style the course grid for horizontal scrolling
        courseGrid.style.display = 'flex';
        courseGrid.style.overflowX = 'hidden';
        courseGrid.style.scrollBehavior = 'smooth';
        courseGrid.style.paddingBottom = '10px'; // For any overflow shadow
        
        const courseCards = courseGrid.querySelectorAll('.course-card');
        courseCards.forEach(card => {
            card.style.flex = '0 0 auto';
            card.style.width = '250px';
            card.style.marginRight = '20px';
        });
    }
} 
 
// Toggle visibility with fade effect
function fadeOut(element) {
    if (!element) return;
    element.style.opacity = 0;
}

function fadeIn(element) {
    if (!element) return;
    element.style.opacity = 1;
}


// Update URL with active tab parameter
function updateURLParameter(param, value) {
    const url = new URL(window.location.href);
    url.searchParams.set(param, value);
    window.history.replaceState({}, '', url);
}

// Scroll to the correct section based on the tab
function urlScrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const yOffset = (window.innerHeight - section.clientHeight) / 2; // Center offset
        const y = section.getBoundingClientRect().top + window.pageYOffset - yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    }
}



// Activate the correct tab based on URL parameter
function activateTabFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const activeTab = urlParams.get('tab');
    if (activeTab) {
        if (activeTab.startsWith('social')) {
            urlScrollToSection('social-section');
            if (activeTab === 'social-account-setup') toggleSwitch(0, 'social');
            else if (activeTab === 'social-account-management') toggleSwitch(1, 'social');
        } else if (activeTab.startsWith('book')) {
            urlScrollToSection('bookkeeping-section');
            if (activeTab === 'book-setup') toggleSwitch(0, 'book');
            else if (activeTab === 'book-management') toggleSwitch(1, 'book');
        }
    }
}

// Anchor click event listeners
function setupAnchorListeners() {
    const bookManagementShortcut = document.getElementById('book-management-shortcut');
    const accountManagementShortcut = document.getElementById('ac-management-shortcut');

    if (bookManagementShortcut) {
        bookManagementShortcut.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Bookkeeping shortcut clicked');
            toggleSwitch(1, 'book');
        });
    }

    if (accountManagementShortcut) {
        accountManagementShortcut.addEventListener('click', (e) => {
            //e.preventDefault();
            toggleSwitch(1, 'social');
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setupAnchorListeners();
    activateTabFromURL();
});


// Toggle function for social account and bookkeeping sections
function toggleSwitch(toggleIndex, toggleGroup) {
    if (toggleGroup === 'social') {
        const socialSetup = document.getElementById('social-account-setup');
        const socialManagement = document.getElementById('social-account-management');
        const socialOptions = document.querySelectorAll('.toggle-container.social .toggle-option');
        const socialSlider = document.querySelector('.toggle-container.social .toggle-slider');

        // Hide both before starting animations
        socialSetup.style.display = 'none';
        socialManagement.style.display = 'none';

        setTimeout(() => {
            if (toggleIndex === 0) {
                socialSetup.style.display = 'block';
                fadeIn(socialSetup);
                socialOptions[0].classList.add('active');
                socialOptions[1].classList.remove('active');
                socialSlider.style.left = '0';
                updateURLParameter('tab', 'social-account-setup');
            } else {
                socialManagement.style.display = 'block';
                fadeIn(socialManagement);
                socialOptions[0].classList.remove('active');
                socialOptions[1].classList.add('active');
                socialSlider.style.left = '50%';
                updateURLParameter('tab', 'social-account-management');
            }
        }, 10); // Reduced to 10ms to minimize flicker

    } else if (toggleGroup === 'book') {
        const bookSetup = document.getElementById('book-setup');
        const bookManagement = document.getElementById('book-management');
        const bookOptions = document.querySelectorAll('.toggle-container.book .toggle-option');
        const bookSlider = document.querySelector('.toggle-container.book .toggle-slider');

        // Hide both before starting animations
        bookSetup.style.display = 'none';
        bookManagement.style.display = 'none';

        setTimeout(() => {
            if (toggleIndex === 0) {
                bookSetup.style.display = 'block';
                fadeIn(bookSetup);
                bookOptions[0].classList.add('active');
                bookOptions[1].classList.remove('active');
                bookSlider.style.left = '0';
                updateURLParameter('tab', 'book-setup');
            } else {
                bookManagement.style.display = 'block';
                fadeIn(bookManagement);
                bookOptions[0].classList.remove('active');
                bookOptions[1].classList.add('active');
                bookSlider.style.left = '50%';
                updateURLParameter('tab', 'book-management');
            }
        }, 10); // Reduced to 10ms to prevent both showing at once
    }
}


// Set default visibility on page load
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(() => {
        activateTabFromURL();
        restoreToggleStates();
    }, 50);

    function updatePricing(group, isQuarterly) {
        const prices = {
            'brand-builder': isQuarterly ? '$6,480/qtr' : '$2,400/mo',
            'brand-accelerator': isQuarterly ? '$9,720/qtr' : '$3,600/mo',
            'essential-book': isQuarterly ? '$3,240/qtr' : '$1,200/mo',
            'premium-book': isQuarterly ? '$6,480/qtr' : '$2,400/mo',
            'va-business': isQuarterly ? '$6,480/qtr' : '$2,400/mo',
            'va-premium': isQuarterly ? '$3,240/qtr' : '$1,200/mo'
        };

 const links = {
            'brand-builder': isQuarterly
                ? 'https://packages.connettiq.com/product-details/product/681d364b0b214471a8327b43'
                : 'https://packages.connettiq.com/product-details/product/681d35dce996ef6bf54c1763',
            'brand-accelerator': isQuarterly
                ? 'https://packages.connettiq.com/product-details/product/681d36e90b2144a61a327c16'
                : 'https://packages.connettiq.com/product-details/product/681d36a50b2144b680327bad',
            'essential-book': isQuarterly
                ? 'https://packages.connettiq.com/product-details/product/681d3a14b6a3fd55866d2f24'
                : 'https://packages.connettiq.com/product-details/product/681d3961e996ef06d74c1983',
            'premium-book': isQuarterly
                ? 'https://packages.connettiq.com/product-details/product/681d3b42e996ef76c64c1b74'
                : 'https://packages.connettiq.com/product-details/product/681d3a92e74e76dadb6bd189',
            'va-business': isQuarterly
                ? 'https://packages.connettiq.com/product-details/product/681e66a5e74e76bbf26c5cae'
                : 'https://packages.connettiq.com/product-details/product/681e6670c83ce11af2b9afe3',
            'va-premium': isQuarterly
                ? 'https://packages.connettiq.com/product-details/product/681e6733b6a3fd192b6daa15'
                : 'https://packages.connettiq.com/product-details/product/681e66e6b6a3fd87c66da9fa'
        };

        const priceIdMap = {
            'brand-builder': 'brand-builder-price',
            'brand-accelerator': 'brand-accelerator-price',
            'essential-book': 'essential-book-price',
            'premium-book': 'premium-book-price',
            'va-business': 'va-business-price',
            'va-premium': 'va-premium-price'
        };

        const linkIdMap = {
            'brand-builder': 'brand-builder-purchase-link',
            'brand-accelerator': 'brand-accelerator-link',
            'essential-book': 'essential-purchase-link',
            'premium-book': 'premium-purchase-link',
            'va-business': 'va-business-purchase-link',
            'va-premium': 'va-premium-purchase-link'
        };

        const priceElement = document.getElementById(priceIdMap[group]);
        const linkElement = document.getElementById(linkIdMap[group]);

        if (priceElement) priceElement.textContent = prices[group];
        if (linkElement) linkElement.href = links[group];

        // Discount visibility handling
    if (group === 'va-business' || group === 'va-premium') {
        const businessDiscount = document.getElementById('discount-message-business');
        const premiumDiscount = document.getElementById('discount-message-premium');
        const monthlyNote = document.getElementById('monthly-note-va');
        const quarterlyNote = document.getElementById('quarterly-note-va');

        if (group === 'va-business' && businessDiscount)
            businessDiscount.style.display = isQuarterly ? 'block' : 'none';
        if (group === 'va-premium' && premiumDiscount)
            premiumDiscount.style.display = isQuarterly ? 'block' : 'none';

        if (monthlyNote) monthlyNote.style.display = isQuarterly ? 'none' : 'block';
        if (quarterlyNote) quarterlyNote.style.display = isQuarterly ? 'block' : 'none';
    }

    if (group === 'brand-builder' || group === 'brand-accelerator') {
        const builderDiscount = document.getElementById('discount-message-brandbuild');
        const accelDiscount = document.getElementById('discount-message-brandaccel');

        if (group === 'brand-builder' && builderDiscount)
            builderDiscount.style.display = isQuarterly ? 'block' : 'none';
        if (group === 'brand-accelerator' && accelDiscount)
            accelDiscount.style.display = isQuarterly ? 'block' : 'none';
    }

    if (group === 'essential-book' || group === 'premium-book') {
        const essentialDiscount = document.getElementById('discount-message-bookessential');
        const premiumDiscount = document.getElementById('discount-message-businessprem');

        if (group === 'essential-book' && essentialDiscount)
            essentialDiscount.style.display = isQuarterly ? 'block' : 'none';
        if (group === 'premium-book' && premiumDiscount)
            premiumDiscount.style.display = isQuarterly ? 'block' : 'none';
    }
    }

 


    // Restore toggle state on page load
    function restoreToggleStates() {
        const vaState = sessionStorage.getItem('billing-va') === 'true';
        const socialState = sessionStorage.getItem('billing-social') === 'true';
        const bookkeepingState = sessionStorage.getItem('billing-bookkeeping') === 'true';

        const vaToggle = document.getElementById('billing-checkbox-va');
        const socialToggle = document.getElementById('billing-checkbox-social');
        const bookkeepingToggle = document.getElementById('billing-checkbox-bookkeeping');

        if (vaToggle) {
            vaToggle.checked = vaState;
            updatePricing('va-business', vaState);
            updatePricing('va-premium', vaState);
        }

        if (socialToggle) {
            socialToggle.checked = socialState;
            updatePricing('brand-builder', socialState);
            updatePricing('brand-accelerator', socialState);
        }

        if (bookkeepingToggle) {
            bookkeepingToggle.checked = bookkeepingState;
            updatePricing('essential-book', bookkeepingState);
            updatePricing('premium-book', bookkeepingState);
        }
    }

    // Save toggle state and update pricing
    document.getElementById('billing-checkbox-va')?.addEventListener('change', function (e) {
        const isQuarterly = e.target.checked;
        sessionStorage.setItem('billing-va', isQuarterly);
        updatePricing('va-business', isQuarterly);
        updatePricing('va-premium', isQuarterly);
    });

    document.getElementById('billing-checkbox-social')?.addEventListener('change', function (e) {
        const isQuarterly = e.target.checked;
        sessionStorage.setItem('billing-social', isQuarterly);
        updatePricing('brand-builder', isQuarterly);
        updatePricing('brand-accelerator', isQuarterly);
    });

    document.getElementById('billing-checkbox-bookkeeping')?.addEventListener('change', function (e) {
        const isQuarterly = e.target.checked;
        sessionStorage.setItem('billing-bookkeeping', isQuarterly);
        updatePricing('essential-book', isQuarterly);
        updatePricing('premium-book', isQuarterly);
    });
});




function scrollToSection(index, containerClass, sectionId) {
    const container = document.querySelector(`.toggle-container.${containerClass}`);
    const options = container.querySelectorAll(`.toggle-option.${containerClass}-option`);
    const slider = container.querySelector(`.toggle-slider.${containerClass}-slider`);

    // Remove the active class from all options
    options.forEach((option) => option.classList.remove('active'));

    // Add the active class to the selected option
    options[index].classList.add('active');

    // Move the slider to the correct position
    slider.style.left = `${(100 / 2) * index}%`;

    // Smooth scroll to the specified section with additional top margin
    const target = document.getElementById(sectionId);
    if (target) {
        const offset = 200; // Adjust this value for the desired top margin
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
}



document.addEventListener("DOMContentLoaded", function () {
    const toggleWrapper = document.querySelector(".toggle-wrapper");
    const socialSection = document.getElementById("socmed-email-marketing");
    const vaTable = document.getElementById("virtual-business-processes");

    const activateSticky = (isActive) => {
        if (isActive) {
            toggleWrapper.classList.add("sticky", "sticky-active");
        } else {
            toggleWrapper.classList.remove("sticky", "sticky-active");
        }
    };

    // Observer for activating sticky on social section
    const socialObserver = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                activateSticky(true);
            }
        },
        { threshold: 0.5 } // Trigger when at least 10% is visible
    );

    // Observer for deactivating sticky on VA table
    const vaObserver = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                activateSticky(false);
            }
        },
        { threshold: 0.5 } // Trigger when at least 100% is visible
    );

    if (socialSection) socialObserver.observe(socialSection);
    if (vaTable) vaObserver.observe(vaTable);
});

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('social-account-setup').style.display = 'block';
    document.getElementById('book-setup').style.display = 'block';
    document.getElementById('social-account-management').style.display = 'none';
    document.getElementById('book-management').style.display = 'none';
});



    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle=\"tooltip\"]'))
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl)
    })



 

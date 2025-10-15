document.addEventListener("DOMContentLoaded", function () {
    showSection(0); // Set Virtual Assistant as the default section
});

function showSection(index) {
    const sections = ['virtual-assistant-mobile', 'cms-social' ];
    const options = document.querySelectorAll('.switch-option');
 sections.forEach((id, i) => {
  const section = document.getElementById(id);
  if (section) {
    section.style.display = (i === index) ? 'flex' : 'none';
  }
  if (options[i]) {
    options[i].classList.toggle('active', i === index);
  }
});

    const slider = document.getElementById('slider');
    slider.style.transition = 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out';
    slider.style.transform = `translateX(${index * 100}%)`;
}

function priceToggleCMS_SocialManagement() {
    const toggle = document.getElementById('billing-checkbox-social-mobile');
    const brandBuilderPrice = document.getElementById('brand-builder-price-mobile');
    const brandAcceleratorPrice = document.getElementById('brand-accelerator-price-mobile');
    const brandBuilderLink = document.getElementById('brand-builder-purchase-link-mobile');
    const brandAcceleratorLink = document.getElementById('brand-accelerator-link-mobile');
    const saveBrandBuild = document.getElementById('save-brandbuild-quarterly-mobile-cms');
    const saveBrandAccel = document.getElementById('save-brandaccel-quarterly-mobile-cms');

    function updateSocialPrices(isQuarterly) {
        if (isQuarterly) {
            brandBuilderPrice.textContent = '$6,480/qtr';
            brandAcceleratorPrice.textContent = '$9,720/qtr';
            brandBuilderLink.href = 'https://packages.connettiq.com/product-details/product/681d364b0b214471a8327b43';
            brandAcceleratorLink.href = 'https://packages.connettiq.com/product-details/product/681d36e90b2144a61a327c16';
            saveBrandBuild.style.display = 'block';
            saveBrandAccel.style.display = 'block';
        } else {
            brandBuilderPrice.textContent = '$2,400/mo';
            brandAcceleratorPrice.textContent = '$3,600/mo';
            brandBuilderLink.href = 'https://packages.connettiq.com/product-details/product/681d35dce996ef6bf54c1763';
            brandAcceleratorLink.href = 'https://packages.connettiq.com/product-details/product/681d36a50b2144b680327bad';
            saveBrandBuild.style.display = 'none';
            saveBrandAccel.style.display = 'none';
        }
    }

    updateSocialPrices(false);

    toggle.addEventListener('change', function () {
        updateSocialPrices(toggle.checked);
    });
}


 

function priceToggleCMS_VA() {
    const toggle = document.getElementById('va-checkbox-bookkeeping-mobile');
    const vaBusinessPrice = document.getElementById('va-business-price-mobile');
    const vaPremiumPrice = document.getElementById('va-premium-price-mobile');
    const vaBusinessLink = document.getElementById('va-business-purchase-link-mobile');
    const vaPremiumLink = document.getElementById('va-premium-purchase-link-mobile');

    const monthlyNote = document.getElementById('monthly-mobile-table-note');
    const quarterlyNote = document.getElementById('quarterly-mobile-table-note');
    const saveBusiness = document.getElementById('save-business-quarterly-mobile-cms');
    const savePremium = document.getElementById('save-premium-quarterly-mobile-cms');

    function updatePricesAndNotes(isQuarterly) {
        if (isQuarterly) {
            vaBusinessPrice.textContent = '$6,480/qtr';
            vaPremiumPrice.textContent = '$3,240/qtr';
            vaBusinessLink.href = 'https://packages.connettiq.com/product-details/product/681e66a5e74e76bbf26c5cae';
            vaPremiumLink.href = 'https://packages.connettiq.com/product-details/product/681e6733b6a3fd192b6daa15';

            quarterlyNote.style.display = 'block';
            monthlyNote.style.display = 'none';
            saveBusiness.style.display = 'block';
            savePremium.style.display = 'block';
        } else {
            vaBusinessPrice.textContent = '$2,400/mo';
            vaPremiumPrice.textContent = '$1,200/mo';
            vaBusinessLink.href = 'https://packages.connettiq.com/product-details/product/681e6670c83ce11af2b9afe3';
            vaPremiumLink.href = 'https://packages.connettiq.com/product-details/product/681e66e6b6a3fd87c66da9fa';

            monthlyNote.style.display = 'block';
            quarterlyNote.style.display = 'none';
            saveBusiness.style.display = 'none';
            savePremium.style.display = 'none';
        }
    }

    updatePricesAndNotes(false);

    toggle.addEventListener('change', function () {
        updatePricesAndNotes(toggle.checked);
    });
}


// Initialize the toggle functions on page load
document.addEventListener('DOMContentLoaded', function () {
    priceToggleCMS_SocialManagement();
 
    priceToggleCMS_VA();
});



//Social Media Section Sub category code
document.addEventListener("DOMContentLoaded", function () {
    const setupBtn = document.querySelector(".category-menu-mobile button:nth-child(1)");
    const managementBtn = document.querySelector(".category-menu-mobile button:nth-child(2)");
    const managementLink = document.querySelector(".table-shortcut-social-mobile");

    const setupSection = document.getElementById("social-account-setup-mobile");
    const managementSection = document.getElementById("social-account-management-mobile");

    function activateSection(active, inactive, activeBtn, inactiveBtn, tabName) {
        active.style.display = "flex";
        inactive.style.display = "none";

        activeBtn.classList.add("active");
        inactiveBtn.classList.remove("active");

        updateURLParam(tabName);
    }

    function updateURLParam(tabValue) {
        const url = new URL(window.location);
        url.searchParams.set("tab", tabValue);
        window.history.pushState({}, "", url);
    }

    // Set Account Setup as default
    activateSection(setupSection, managementSection, setupBtn, managementBtn, "mobile-social-account-setup");

    setupBtn.addEventListener("click", function () {
        activateSection(setupSection, managementSection, setupBtn, managementBtn, "mobile-social-account-setup");
    });

    managementBtn.addEventListener("click", function () {
        activateSection(managementSection, setupSection, managementBtn, setupBtn, "mobile-social-account-management");
    });

    managementLink.addEventListener("click", function (event) {
        event.preventDefault();
        activateSection(managementSection, setupSection, managementBtn, setupBtn, "mobile-social-account-management");
    });
});

 

 
// Step 1: Map tab value and store in sessionStorage early
(function () {
  const isMobile = window.innerWidth < 767;
  const tabMap = {
    "social-account-setup": "mobile-social-account-setup",
    "social-account-management": "mobile-social-account-management",
    "book-setup": "mobile-bookkeeping-setup",
    "book-management": "mobile-bookkeeping-management",
  };

  if (isMobile) {
    const urlParams = new URLSearchParams(window.location.search);
    const originalTab = urlParams.get("tab");

    if (originalTab && tabMap[originalTab]) {
      const mappedTab = tabMap[originalTab];
      sessionStorage.setItem("resolvedTab", mappedTab);

      // Update URL without reloading
      const url = new URL(window.location.href);
      url.searchParams.set("tab", mappedTab);
      window.history.replaceState({}, '', url.toString());
    } else if (originalTab) {
      // Store unmodified if no mapping
      sessionStorage.setItem("resolvedTab", originalTab);
    }
  }
})();
 

 
// Step 2: Wait for DOM to apply the section logic
document.addEventListener("DOMContentLoaded", function () {
  const isMobile = window.innerWidth < 767;

  if (isMobile) {
    const tab = sessionStorage.getItem("resolvedTab");
    console.log("Using stored resolvedTab:", tab);

    let sectionHandled = false;

    switch (tab) {
      case "mobile-social-account-setup":
        showSection(1);
        document.getElementById("account-setup-button")?.click();
        sectionHandled = true;
        break;
      case "mobile-social-account-management":
        showSection(1);
        document.getElementById("account-management-button")?.click();
        sectionHandled = true;
        break;
     
    }

    if (!sectionHandled) {
      showSection(0);
    }

    initMobileTabs();
  }
});
 



  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle=\"tooltip\"]'))
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl)
    })
 

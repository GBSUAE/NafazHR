// Toggle Profile Dropdown
function toggleProfileDropdown() {
  const dropdown = document.getElementById('profileDropdown');
  dropdown.style.display = (dropdown.style.display === 'flex') ? 'none' : 'flex';
  dropdown.style.flexDirection = 'column';
}

// Close dropdown when clicking outside
// Now handles both image and placeholder clicks
document.addEventListener('click', function(event) {
  const dropdown = document.getElementById('profileDropdown');
  const avatar = document.getElementById('profileAvatarContainer');
  if (!avatar.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.style.display = 'none';
  }
});

// Toggle Burger Menu
function toggleBurgerMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
  menu.style.flexDirection = 'column';
}

// Inject logo, avatar, and theme
function injectClientAssets() {
  const ctx = window.nafazContext || {};
const companyCode = ctx.companyCode || 'default';
const fullName = ctx.userFullName || 'User';
const profileImageURL = ctx.profileImageURL || null;
const logoPath = ctx.logoPath || `clients/${companyCode}/logo.svg`;
const clientCSS = ctx.clientCSS || `clients/${companyCode}/client.css`;

  // Load client-specific CSS theme (prevent duplicate link)
  if (!document.querySelector(`link[href="clients/${companyCode}/client.css"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `clients/${companyCode}/client.css`;
    document.head.appendChild(link);
  }

  // Inject logo with error handling
  const logoEl = document.getElementById('navbarLogo');
  if (logoEl) {
    logoEl.onerror = () => {
      console.warn(`Logo not found: clients/${companyCode}/logo.svg`);
      logoEl.style.display = 'none';
    };
    logoEl.src = `clients/${companyCode}/logo.svg`;
  }

  // Inject avatar (image or initials), avoid duplicates
  const injectAvatar = (targetId) => {
    const target = document.getElementById(targetId);
    if (!target || target.children.length > 0) return;

    if (profileImageURL) {
      const img = document.createElement('img');
      img.src = profileImageURL;
      img.alt = 'Profile';
      img.className = 'navbar5-profile-img';
      img.onerror = () => {
        console.warn(`Avatar image failed: ${profileImageURL}`);
        img.remove();
      };
      target.appendChild(img);
    } else {
      const initials = fullName
        .split(' ')
        .map(name => name.charAt(0).toUpperCase())
        .slice(0, 2)
        .join('');
      const div = document.createElement('div');
      div.className = 'navbar5-profile-placeholder';
      div.textContent = initials;
      target.appendChild(div);
    }
  };

  injectAvatar('profileAvatarContainer');
  injectAvatar('mobileProfileTrigger');

  // Optional: Footer logo support with error handling
  const footerLogo = document.getElementById('footerClientLogo');
  if (footerLogo) {
    footerLogo.onerror = () => {
      console.warn(`Footer logo missing: clients/${companyCode}/logo.svg`);
      footerLogo.style.display = 'none';
    };
    footerLogo.src = `clients/${companyCode}/logo.svg`;
  }
}

// Run injection after DOM is ready
document.addEventListener('DOMContentLoaded', injectClientAssets);

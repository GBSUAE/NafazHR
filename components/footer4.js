// Toggle Policies Dropdown (Mobile)
function togglePolicies() {
  const dropdown = document.getElementById('policiesDropdown');
  dropdown.style.display = (dropdown.style.display === 'flex') ? 'none' : 'flex';
}

// Inject client logo from nafazContext
function injectFooterLogo() {
  const ctx = window.nafazContext || {};
  const logoPath = ctx.logoPath || `clients/${ctx.companyCode || 'default'}/logo.svg`;
  const logo = document.getElementById('footerClientLogo');

  if (logo) {
    logo.onerror = () => {
      console.warn(`Footer logo missing: ${logoPath}`);
      logo.style.display = 'none';
    };
    logo.src = logoPath;
  }
}

document.addEventListener('DOMContentLoaded', injectFooterLogo);
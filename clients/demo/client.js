document.title = "Demo HR Portal";

const navbarTitle = document.querySelector('.navbar-title');
if (navbarTitle) {
  navbarTitle.textContent = "Welcome to Demo HR System";
}

document.addEventListener('DOMContentLoaded', () => {
  const ctx = window.nafazContext || {};
  const companyCode = ctx.companyCode || 'default';

  // Inject footer logo if footer is already loaded
  const footerLogo = document.getElementById('footerClientLogo');
  if (footerLogo) {
    const logoPath = `clients/${companyCode}/logo.svg`;
    footerLogo.src = logoPath;
    footerLogo.onerror = () => {
      console.warn(`Missing footer logo: ${logoPath}`);
      footerLogo.style.display = 'none';
    };
  }

  // Prepare policy link HTML
  const policyHTML = `
    <a href="clients/${companyCode}/hr-policy.html" target="_blank">HR Policy</a>
    <a href="clients/${companyCode}/leave-policy.html" target="_blank">Leave Policy</a>
    <a href="clients/${companyCode}/travel-policy.html" target="_blank">Travel Policy</a>
    <a href="clients/${companyCode}/exit-process.html" target="_blank">Exit Process</a>
  `;

  // Inject desktop policy links
  const desktopContainer = document.getElementById('footerPoliciesContainer');
  if (desktopContainer) {
    desktopContainer.innerHTML = policyHTML;
  }

  // Inject mobile dropdown policy links
  const dropdownContainer = document.getElementById('policiesDropdown');
  if (dropdownContainer) {
    dropdownContainer.innerHTML = policyHTML;
  }
});

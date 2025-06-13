document.addEventListener('DOMContentLoaded', function() {

  const companyCodeInput = document.getElementById('companyCode');
  const verifyCompanyCodeButton = document.getElementById('verifyCompanyCode');
  const companyCodeMessage = document.getElementById('companyCodeMessage');
  const companyCodeBlock = document.getElementById('company-code-block');

  const loginBlock = document.getElementById('login-block');
  const userIdInput = document.getElementById('userId');
  const passwordInput = document.getElementById('password');
  const loginButton = document.getElementById('loginButton');
  const forgotPasswordLink = document.getElementById('forgotPasswordLink');
  const loginMessage = document.getElementById('loginMessage');

  // === Verify Company Code ===
  verifyCompanyCodeButton.addEventListener('click', function() {
    const companyCode = companyCodeInput.value.trim();

    if (!companyCode) {
      companyCodeMessage.textContent = 'Please enter a Company Code.';
      return;
    }

    companyCodeMessage.textContent = 'Verifying...';

    // DEMO MODE — Simulate API
    setTimeout(() => {
      if (companyCode.toLowerCase() === 'demo' || companyCode === 'gbs123') {
        companyCodeMessage.textContent = 'Company Code verified!';

companyCodeBlock.style.display = 'none';
loginBlock.style.display = 'block';

const clientCode = companyCode.toLowerCase();
localStorage.setItem("client", clientCode);

// Load client-specific branding and footer
loadClientBranding(clientCode);
loadFooterComponent();        

      } else {
        companyCodeMessage.textContent = 'Invalid Company Code. Please try again.';
        loginBlock.style.display = 'none';
      }
    }, 1000);
  });

  // === Login ===
  loginButton.addEventListener('click', function() {
    const userId = userIdInput.value.trim();
    const password = passwordInput.value.trim();

    if (!userId || !password) {
      loginMessage.textContent = 'Please enter User ID and Password.';
      return;
    }

    loginMessage.textContent = 'Logging in...';

    // DEMO MODE
    setTimeout(() => {
      if (companyCodeInput.value.trim().toLowerCase() === 'demo'
          && userId === 'EM123'
          && password === 'Welcome@123') {
        loginMessage.textContent = 'Login successful! Redirecting to Demo Dashboard...';
        window.location.href = 'https://gbsuae.github.io/Demo_Dashboard_Employee/';
      } else {
        loginMessage.textContent = 'Invalid User ID or Password.';
      }
    }, 1000);
  });

  // === Forgot Password ===
  forgotPasswordLink.addEventListener('click', function(event) {
    event.preventDefault();

    const companyCode = companyCodeInput.value.trim();
    const userId = userIdInput.value.trim();

    if (!companyCode || !userId) {
      loginMessage.textContent = 'Please enter User ID to reset password.';
      return;
    }

    loginMessage.textContent = 'Sending reset password email...';

    // DEMO MODE — Simulate API
    setTimeout(() => {
      loginMessage.textContent = 'Reset password email sent to your official email!';
    }, 1000);
  });

});

function loadClientBranding(clientCode) {
  // Load client CSS
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = `clients/${clientCode}/client.css`;
  document.head.appendChild(css);

  // Load client JS
  const script = document.createElement('script');
  script.src = `clients/${clientCode}/client.js`;
  document.body.appendChild(script);

  // Update logo (with fallback)
  const logo = document.getElementById('logo');
  if (logo) {
    logo.src = `clients/${clientCode}/logo.svg`;
    logo.onerror = () => {
      logo.src = 'public/GBS Logo_White.svg';
    };
  }
}

function loadFooterComponent() {
  fetch('components/footer4.html')
    .then(res => res.text())
    .then(html => {
      const footerContainer = document.getElementById('footerContainer');
      footerContainer.innerHTML = html;

      // Load footer CSS
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'components/footer4.css';
      document.head.appendChild(css);

      // Load footer JS
      const script = document.createElement('script');
      script.src = 'components/footer4.js';
      script.defer = true;
      document.body.appendChild(script);
    });
}

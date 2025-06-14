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

// === Direct login check ===
  initDirectLogin();  // call the function

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
  const clientCode = companyCode.toLowerCase();
  const testCssUrl = `clients/${clientCode}/client.css`;

  fetch(testCssUrl, { method: 'HEAD' })
    .then((res) => {
      if (res.ok) {
        companyCodeMessage.textContent = 'Company Code verified!';
        companyCodeBlock.style.display = 'none';
        loginBlock.style.display = 'block';

        localStorage.setItem("client", clientCode);

        // ✅ Load client-specific branding and footer
        loadClientBranding(clientCode);
        loadFooterComponent();
      } else {
        throw new Error(); // force catch
      }
    })
    .catch(() => {
      companyCodeMessage.textContent = 'Invalid Company Code. Please try again.';
      loginBlock.style.display = 'none';
    });
}, 500); // optional delay
}); // ✅ This closing bracket was missing

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
    .then(res => {
      if (!res.ok) throw new Error('Custom footer not found');
      return res.text();
    })
    .then(html => {
      const footerContainer = document.getElementById('footerContainer');
      footerContainer.innerHTML = html;

      // Hide static footer
      const staticFooter = document.getElementById('staticFooter');
      if (staticFooter) staticFooter.style.display = 'none';

      // Load custom footer styles and scripts
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = 'components/footer4.css';
      document.head.appendChild(css);

      const script = document.createElement('script');
      script.src = 'components/footer4.js';
      script.defer = true;
      document.body.appendChild(script);
    })
    .catch(() => {
      // Fallback footer content if footer4.html fails
      const fallbackHTML = `
        <footer class="footer">
          &copy; 2025 NafazHR. Powered by Gap Bridging Solutions.
          Visit <a href="https://nafazhr.com" target="_blank">our website</a> to learn more.
        </footer>
      `;
      const footerContainer = document.getElementById('footerContainer');
      footerContainer.innerHTML = fallbackHTML;

      // Hide static footer if still visible
      const staticFooter = document.getElementById('staticFooter');
      if (staticFooter) staticFooter.style.display = 'none';
    });
}

function getCompanyFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get('company');
}

async function initDirectLogin() {
  const clientCode = getCompanyFromQuery();
  if (!clientCode) return;

  try {
    const response = await fetch(`clients/${clientCode}/client.css`, { method: 'HEAD' });
    if (!response.ok) throw new Error('Client CSS not found');

    // Store and load assets
    localStorage.setItem("client", clientCode);
    loadClientBranding(clientCode);
    loadFooterComponent();

    // Hide company block, show login
    document.getElementById('company-code-block').style.display = 'none';
    document.getElementById('login-block').style.display = 'block';

    // Optional note
    const note = document.getElementById('brand-note');
    if (note) {
      note.innerText = `You are logging in to "${clientCode}" HR portal.`;
    }

  } catch (err) {
    console.error('Direct login failed:', err);
  }
}



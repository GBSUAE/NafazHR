// components/api.js

(function () {
  // Static mock data for now
  const mockContext = {
    companyCode: "demo",
    userFullName: "Demo User",
    profileImageURL: null, // or "uploads/users/demo-user.jpg"
    clientCSS: "clients/demo/client.css",
    logoPath: "clients/demo/logo.svg"
  };

  // Expose to all components globally
  window.nafazContext = mockContext;

  // Optional: Dynamically inject the client CSS
  if (!document.querySelector(`link[href="${mockContext.clientCSS}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = mockContext.clientCSS;
    document.head.appendChild(link);
  }
})();

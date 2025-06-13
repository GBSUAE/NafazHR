// Load Navbar
fetch('components/navbar5.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('navbar-placeholder').innerHTML = data;
  });

// Load Footer
fetch('components/footer4.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
  });

document.addEventListener('DOMContentLoaded', function() {

  // Elements
  const submitChangePassword = document.getElementById('submitChangePassword');
  const changePasswordMessage = document.getElementById('changePasswordMessage');

  // Submit handler
  submitChangePassword.addEventListener('click', function() {
    // Get form values
    const currentPassword = document.getElementById('currentPassword').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();
    const confirmPassword = document.getElementById('confirmPassword').value.trim();

    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      showMessage('Please fill in all fields.', 'error');
      return;
    }

    if (newPassword !== confirmPassword) {
      showMessage('New Password and Confirm Password do not match.', 'error');
      return;
    }

    // TODO: Replace with actual API call
    console.log('Submitting Change Password:', {
      currentPassword,
      newPassword
    });

    // Simulate success
    showMessage('Your password has been changed successfully!', 'success');

    // Optionally reset form
    // document.getElementById('change-password-form').reset();
  });

  // Helper: Show message
  function showMessage(message, type) {
    changePasswordMessage.textContent = message;
    changePasswordMessage.style.color = (type === 'success') ? 'green' : 'red';
  }

});

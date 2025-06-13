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

// Drama Logic for Leave Form
document.addEventListener('DOMContentLoaded', function() {
  const leaveTypeSelect = document.getElementById('leaveType');
  const attachmentField = document.getElementById('attachment-field');
  const remarkLabel = document.getElementById('remark-label');

  leaveTypeSelect.addEventListener('change', function() {
    const selectedValue = leaveTypeSelect.value;

    // Show attachment only for Sick Leave
    if (selectedValue === 'SickLeave') {
      attachmentField.style.display = 'flex';
    } else {
      attachmentField.style.display = 'none';
    }

    // Change Remark label
    if (selectedValue === 'SpecialLeave') {
      remarkLabel.textContent = 'Type of Special Leave';
    } else {
      remarkLabel.textContent = 'Remark';
    }
  });
});

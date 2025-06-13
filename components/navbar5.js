// Toggle Profile Dropdown
function toggleProfileDropdown() {
  const dropdown = document.getElementById('profileDropdown');
  dropdown.style.display = (dropdown.style.display === 'flex') ? 'none' : 'flex';
  dropdown.style.flexDirection = 'column';
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
  const dropdown = document.getElementById('profileDropdown');
  const profileImg = document.querySelector('.navbar5-profile-img');
  if (!profileImg.contains(event.target) && !dropdown.contains(event.target)) {
    dropdown.style.display = 'none';
  }
});

// Toggle Burger Menu
function toggleBurgerMenu() {
  const menu = document.getElementById('mobileMenu');
  menu.style.display = (menu.style.display === 'flex') ? 'none' : 'flex';
  menu.style.flexDirection = 'column';
}

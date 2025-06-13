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

  // === View / Edit Toggle ===
  const editIcons = document.querySelectorAll('.edit-icon');
  const saveButtons = document.querySelectorAll('.save-section-btn');
  const cancelButtons = document.querySelectorAll('.cancel-section-btn');

  let sectionOriginalData = {};

  editIcons.forEach(icon => {
    icon.addEventListener('click', function() {
      const section = icon.getAttribute('data-section');
      takeSectionSnapshot(section);
      toggleSection(section, 'edit');
    });
  });

  saveButtons.forEach(button => {
    button.addEventListener('click', function() {
      const section = button.getAttribute('data-section');
      if (!isSectionChanged(section)) {
        alert('No changes detected. Nothing to submit.');
        return;
      }
      saveSection(section);
      toggleSection(section, 'view');
      alert('Changes submitted for HR Approval!');
    });
  });

  cancelButtons.forEach(button => {
    button.addEventListener('click', function() {
      const section = button.getAttribute('data-section');
      toggleSection(section, 'view');
    });
  });

  function toggleSection(section, mode) {
    const viewDiv = document.querySelector(`#${section}-section .section-view`);
    const editDiv = document.querySelector(`#${section}-section .section-edit`);

    if (mode === 'edit') {
      viewDiv.style.display = 'none';
      editDiv.style.display = 'flex';
    } else {
      viewDiv.style.display = 'block';
      editDiv.style.display = 'none';
    }
  }

  // === takeSectionSnapshot — FULL ===
  function takeSectionSnapshot(section) {
    sectionOriginalData[section] = {};

    if (section === 'personal-info') {
  sectionOriginalData[section].displayName = document.getElementById('displayName').value.trim();
  sectionOriginalData[section].personalEmail = document.getElementById('personalEmail').value.trim();
  sectionOriginalData[section].phone = document.getElementById('phone').value.trim();
  sectionOriginalData[section].dob = document.getElementById('dob').value.trim();
  sectionOriginalData[section].nationality = document.getElementById('nationality').value.trim();
  sectionOriginalData[section].gender = document.getElementById('gender').value;
  sectionOriginalData[section].fatherName = document.getElementById('fatherName').value.trim();
  sectionOriginalData[section].motherName = document.getElementById('motherName').value.trim();
  sectionOriginalData[section].maritalStatus = document.getElementById('maritalStatus').value;
  sectionOriginalData[section].spouseName = document.getElementById('spouseName').value.trim();
  sectionOriginalData[section].spousePhone = document.getElementById('spousePhone').value.trim();
  sectionOriginalData[section].numChildren = document.getElementById('numChildren').value.trim();
}

if (section === 'education') {
  sectionOriginalData[section].employeeDegree = document.getElementById('employeeDegree').value;
  sectionOriginalData[section].employeeUniversity = document.getElementById('employeeUniversity').value.trim();
  sectionOriginalData[section].employeeGraduationYear = document.getElementById('employeeGraduationYear').value.trim();
}
    if (section === 'address') {
      sectionOriginalData[section].address1 = document.getElementById('address1').value.trim();
      sectionOriginalData[section].address2 = document.getElementById('address2').value.trim();
      sectionOriginalData[section].city = document.getElementById('city').value.trim();
      sectionOriginalData[section].state = document.getElementById('state').value.trim();
      sectionOriginalData[section].zip = document.getElementById('zip').value.trim();
      sectionOriginalData[section].country = document.getElementById('country').value.trim();
    }

    if (section === 'bank-details') {
      sectionOriginalData[section].bankName = document.getElementById('bankName').value.trim();
      sectionOriginalData[section].accountNumber = document.getElementById('accountNumber').value.trim();
      sectionOriginalData[section].iban = document.getElementById('iban').value.trim();
      sectionOriginalData[section].swift = document.getElementById('swift').value.trim();
      sectionOriginalData[section].branch = document.getElementById('branch').value.trim();
    }

    if (section === 'documents') {
      sectionOriginalData[section].emiratesIdNumber = document.getElementById('emiratesIdNumber').value.trim();
      sectionOriginalData[section].passportNumber = document.getElementById('passportNumber').value.trim();
      sectionOriginalData[section].visaNumber = document.getElementById('visaNumber').value.trim();
    }

    if (section === 'emergency-contact') {
      sectionOriginalData[section].emergencyRelationship = document.getElementById('emergencyRelationship').value;
      sectionOriginalData[section].emergencyName = document.getElementById('emergencyName').value.trim();
      sectionOriginalData[section].emergencyPhone = document.getElementById('emergencyPhone').value.trim();
    }
  }

  // === isSectionChanged (standard, works for all) ===
  function isSectionChanged(section) {
    const keys = Object.keys(sectionOriginalData[section]);
    return keys.some(key => {
      const element = document.getElementById(key);
      if (!element) return false;
      return sectionOriginalData[section][key] !== element.value.trim();
    });
  }

    function saveSection(section) {
    if (section === 'personal-info') {
      document.getElementById('viewDisplayName').textContent = document.getElementById('displayName').value.trim();
      document.getElementById('viewPersonalEmail').textContent = document.getElementById('personalEmail').value.trim();
      document.getElementById('viewPhone').textContent = document.getElementById('phone').value.trim();
      document.getElementById('viewDob').textContent = document.getElementById('dob').value.trim();
      document.getElementById('viewNationality').textContent = document.getElementById('nationality').value.trim();
      document.getElementById('viewGender').textContent = document.getElementById('gender').value;
      document.getElementById('viewFatherName').textContent = document.getElementById('fatherName').value.trim();
      document.getElementById('viewMotherName').textContent = document.getElementById('motherName').value.trim();
      document.getElementById('viewMaritalStatus').textContent = document.getElementById('maritalStatus').value;

      document.getElementById('viewSpouseName').textContent = document.getElementById('spouseName').value.trim();
      document.getElementById('viewSpousePhone').textContent = document.getElementById('spousePhone').value.trim();

      // === CHILDREN VIEW PATCH STARTS ===
      const viewChildrenDetailsDiv = document.getElementById('view-children-details');
      viewChildrenDetailsDiv.innerHTML = '';

      const numChildren = parseInt(document.getElementById('numChildren').value.trim(), 10);

      if (numChildren > 0) {
        for (let i = 1; i <= numChildren; i++) {
          const childBlock = document.querySelector(`#children-details .child-block:nth-child(${i})`);
          if (childBlock) {
            const childName = childBlock.querySelector('.child-name').value.trim();
            const childGender = childBlock.querySelector('.child-gender').value;
            const childAge = childBlock.querySelector('.child-age').value.trim();
            const childEducationDropdown = childBlock.querySelector('.child-education-dropdown');
            const childEducation = childEducationDropdown ? childEducationDropdown.value : '';

            const childHtml = `
              <div class="child-block">
                <p><strong>Child ${i}:</strong></p>
                <p>Name: ${childName}</p>
                <p>Gender: ${childGender}</p>
                <p>Age: ${childAge}</p>
                <p>Education: ${childEducation}</p>
              </div>
            `;
            viewChildrenDetailsDiv.insertAdjacentHTML('beforeend', childHtml);
          }
        }
      }
      // === CHILDREN VIEW PATCH ENDS ===

      // Show/Hide Dependent Section
      if (document.getElementById('maritalStatus').value === 'Married') {
        document.getElementById('view-dependent-section').style.display = 'block';
      } else {
        document.getElementById('view-dependent-section').style.display = 'none';
      }
    }

    if (section === 'education') {
      document.getElementById('viewEmployeeDegree').textContent = document.getElementById('employeeDegree').value;
      document.getElementById('viewEmployeeUniversity').textContent = document.getElementById('employeeUniversity').value.trim();
      document.getElementById('viewEmployeeGraduationYear').textContent = document.getElementById('employeeGraduationYear').value.trim();
    }

    if (section === 'address') {
      document.getElementById('viewAddress1').textContent = document.getElementById('address1').value.trim();
      document.getElementById('viewAddress2').textContent = document.getElementById('address2').value.trim();
      document.getElementById('viewCity').textContent = document.getElementById('city').value.trim();
      document.getElementById('viewState').textContent = document.getElementById('state').value.trim();
      document.getElementById('viewZip').textContent = document.getElementById('zip').value.trim();
      document.getElementById('viewCountry').textContent = document.getElementById('country').value.trim();
    }

    if (section === 'bank-details') {
      document.getElementById('viewBankName').textContent = document.getElementById('bankName').value.trim();
      document.getElementById('viewAccountNumber').textContent = document.getElementById('accountNumber').value.trim();
      document.getElementById('viewIban').textContent = document.getElementById('iban').value.trim();
      document.getElementById('viewSwift').textContent = document.getElementById('swift').value.trim();
      document.getElementById('viewBranch').textContent = document.getElementById('branch').value.trim();
    }

    if (section === 'documents') {
      document.getElementById('viewEmiratesIdNumber').textContent = document.getElementById('emiratesIdNumber').value.trim();
      document.getElementById('viewPassportNumber').textContent = document.getElementById('passportNumber').value.trim();
      document.getElementById('viewVisaNumber').textContent = document.getElementById('visaNumber').value.trim();

      const emiratesIdFile = document.getElementById('emiratesId').files[0];
      const passportFile = document.getElementById('passport').files[0];
      const visaFile = document.getElementById('visa').files[0];

      if (emiratesIdFile) {
        const emiratesIdURL = URL.createObjectURL(emiratesIdFile);
        const emiratesIdLink = document.getElementById('viewEmiratesIdLink');
        emiratesIdLink.href = emiratesIdURL;
        emiratesIdLink.style.display = 'inline';
      }

      if (passportFile) {
        const passportURL = URL.createObjectURL(passportFile);
        const passportLink = document.getElementById('viewPassportLink');
        passportLink.href = passportURL;
        passportLink.style.display = 'inline';
      }

      if (visaFile) {
        const visaURL = URL.createObjectURL(visaFile);
        const visaLink = document.getElementById('viewVisaLink');
        visaLink.href = visaURL;
        visaLink.style.display = 'inline';
      }
    }

    if (section === 'emergency-contact') {
      document.getElementById('viewEmergencyRelationship').textContent = document.getElementById('emergencyRelationship').value;
      document.getElementById('viewEmergencyName').textContent = document.getElementById('emergencyName').value.trim();
      document.getElementById('viewEmergencyPhone').textContent = document.getElementById('emergencyPhone').value.trim();
    }
  }

    // === Marital Status Drama + Dependent Section ===
  const maritalStatusSelect = document.getElementById('maritalStatus');
  const dependentSection = document.getElementById('dependent-section');
  const spouseGenderInput = document.getElementById('spouseGender');
  const genderSelect = document.getElementById('gender');
  const numChildrenInput = document.getElementById('numChildren');
  const childrenDetailsDiv = document.getElementById('children-details');

  maritalStatusSelect.addEventListener('change', function() {
    if (maritalStatusSelect.value === 'Married') {
      dependentSection.style.display = 'block';
      updateSpouseGender();
      updateEmergencyRelationshipDropdown(true);
    } else {
      dependentSection.style.display = 'none';
      childrenDetailsDiv.innerHTML = '';
      updateEmergencyRelationshipDropdown(false);
    }
  });

  genderSelect.addEventListener('change', function() {
    if (maritalStatusSelect.value === 'Married') {
      updateSpouseGender();
    }
  });

  function updateSpouseGender() {
    if (genderSelect.value === 'Male') {
      spouseGenderInput.value = 'Female';
    } else if (genderSelect.value === 'Female') {
      spouseGenderInput.value = 'Male';
    } else {
      spouseGenderInput.value = '';
    }
  }

  function updateEmergencyRelationshipDropdown(isMarried) {
    const emergencyRelationship = document.getElementById('emergencyRelationship');
    const options = emergencyRelationship.querySelectorAll('option');
    let spouseOptionExists = false;
    options.forEach(opt => {
      if (opt.value === 'Spouse') spouseOptionExists = true;
    });

    if (isMarried && !spouseOptionExists) {
      const spouseOption = document.createElement('option');
      spouseOption.value = 'Spouse';
      spouseOption.textContent = 'Spouse';
      emergencyRelationship.insertBefore(spouseOption, emergencyRelationship.firstChild);
    }

    if (!isMarried && spouseOptionExists) {
      emergencyRelationship.querySelector('option[value="Spouse"]').remove();
      if (emergencyRelationship.value === 'Spouse') {
        emergencyRelationship.value = 'Father'; // fallback
      }
    }
  }

  // === Number of Children Drama ===
  numChildrenInput.addEventListener('input', function() {
    const num = parseInt(numChildrenInput.value, 10);
    childrenDetailsDiv.innerHTML = '';

    if (num > 0) {
      for (let i = 1; i <= num; i++) {
        const childBlock = document.createElement('div');
        childBlock.className = 'child-block';
        childBlock.innerHTML = `
          <h4>Child ${i}</h4>
          <div class="form-group">
            <label>Child Name</label>
            <input type="text" class="input child-name" />
          </div>
          <div class="form-group">
            <label>Child Gender</label>
            <select class="input child-gender">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div class="form-group">
            <label>Child Age</label>
            <input type="number" class="input child-age" min="0" value="0" />
          </div>
          <div class="form-group child-education" style="display: none;">
            <label>Child Education</label>
            <select class="child-education-dropdown input">
              <option value="">-- Select --</option>
              <option value="None">None</option>
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
              <option value="University">University</option>
              <option value="Other">Other</option>
            </select>
          </div>
        `;
        childrenDetailsDiv.appendChild(childBlock);
      }
    }
  });

  // === Child Age Drama ===
  childrenDetailsDiv.addEventListener('input', function(e) {
    if (e.target.classList.contains('child-age')) {
      const ageInput = e.target;
      const age = parseInt(ageInput.value, 10);
      const educationDiv = ageInput.closest('.child-block').querySelector('.child-education');

      if (age > 3) {
        educationDiv.style.display = 'block';
      } else {
        educationDiv.style.display = 'none';
      }
    }
  });

// === Dispatch Events on Load ===
maritalStatusSelect.dispatchEvent(new Event('change'));
numChildrenInput.dispatchEvent(new Event('input'));

// === Emergency Relationship Auto-Populate ===
const emergencyRelationshipSelect = document.getElementById('emergencyRelationship');
const emergencyNameInput = document.getElementById('emergencyName');
const emergencyPhoneInput = document.getElementById('emergencyPhone');

emergencyRelationshipSelect.addEventListener('change', function() {
  if (emergencyRelationshipSelect.value === 'Spouse') {
    // Auto-populate from Personal Info Spouse
    const spouseName = document.getElementById('spouseName').value.trim();
    const spousePhone = document.getElementById('spousePhone').value.trim();

    emergencyNameInput.value = spouseName;
    emergencyPhoneInput.value = spousePhone;
  }
  else if (emergencyRelationshipSelect.value === 'Father') {
    // Auto-populate from Personal Info Father Name → phone manual
    const fatherName = document.getElementById('fatherName').value.trim();

    emergencyNameInput.value = fatherName;
    emergencyPhoneInput.value = ''; // Manual entry
  }
  else if (emergencyRelationshipSelect.value === 'Mother') {
    // Auto-populate from Personal Info Mother Name → phone manual
    const motherName = document.getElementById('motherName').value.trim();

    emergencyNameInput.value = motherName;
    emergencyPhoneInput.value = ''; // Manual entry
  }
  else {
    // Other relationships → manual entry
    emergencyNameInput.value = '';
    emergencyPhoneInput.value = '';
  }
});

}); // END OF DOMContentLoaded

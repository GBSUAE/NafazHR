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

// Drama Logic
document.addEventListener('DOMContentLoaded', function() {
  // ELEMENTS
  const travelTypeSelect = document.getElementById('travelType');
  const fromDate = document.getElementById('fromDate');
  const toDate = document.getElementById('toDate');
  const destination = document.getElementById('destination');
  const transportSelect = document.getElementById('transportMode');
  const submitBtn = document.getElementById('submitBtn');
  const noteField = document.getElementById('note');
  const attachmentLabel = document.getElementById('attachment-label');

  // Drama Fields
  const airFields = document.getElementById('air-fields');
  const carFields = document.getElementById('car-fields');
  const trainFields = document.getElementById('train-fields');
  const taxiFields = document.getElementById('taxi-fields');
  const otherFields = document.getElementById('other-fields');

  // === Travel Type → Note + Attachment label ===
  travelTypeSelect.addEventListener('change', function() {
    const selectedValue = travelTypeSelect.value;

    if (selectedValue === 'ClientVisit') {
      noteField.placeholder = 'Enter Client Name and Meeting Agenda';
      attachmentLabel.textContent = 'Meeting Invite (optional)';
    } else if (selectedValue === 'OfficeErrand') {
      noteField.placeholder = 'Enter Office Task details';
      attachmentLabel.textContent = 'Requirement (optional)';
    } else if (selectedValue === 'Meeting') {
      noteField.placeholder = 'Enter Meeting Details and Participants';
      attachmentLabel.textContent = 'Meeting Agenda / Docs (optional)';
    } else {
      noteField.placeholder = '';
      attachmentLabel.textContent = 'Attachment';
    }

    validateForm();
  });

  // === Mode of Transport → Show/Hide Fields ===
  transportSelect.addEventListener('change', function() {
    const selectedValue = transportSelect.value;

    airFields.style.display = 'none';
    carFields.style.display = 'none';
    trainFields.style.display = 'none';
    taxiFields.style.display = 'none';
    otherFields.style.display = 'none';

    if (selectedValue === 'Air') {
      airFields.style.display = 'flex';
    } else if (selectedValue === 'SelfDrive') {
      carFields.style.display = 'flex';
    } else if (selectedValue === 'Train') {
      trainFields.style.display = 'flex';
    } else if (selectedValue === 'Taxi') {
      taxiFields.style.display = 'flex';
    } else if (selectedValue === 'Other') {
      otherFields.style.display = 'flex';
    }

    validateForm();
  });

  // === Enable / Disable Submit Button ===
  function validateForm() {
    const isValid =
      travelTypeSelect.value &&
      fromDate.value &&
      toDate.value &&
      destination.value.trim() &&
      transportSelect.value;

    submitBtn.disabled = !isValid;
  }

  // Add listeners to required fields
  [travelTypeSelect, fromDate, toDate, destination, transportSelect].forEach(field => {
    field.addEventListener('input', validateForm);
    field.addEventListener('change', validateForm);
  });

  // === Submit Logic ===
  const travelForm = document.querySelector('.travel-request-form');
  travelForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const selectedMode = transportSelect.value;
    let sendEmailToAdmin = false;

    if (selectedMode === 'Air' || selectedMode === 'Train') {
      sendEmailToAdmin = true;
    } else if (selectedMode === 'Taxi') {
      const taxiAdminCheckbox = document.getElementById('taxiAdminBooking');
      if (taxiAdminCheckbox && taxiAdminCheckbox.checked) {
        sendEmailToAdmin = true;
      }
    }

    // Simulate email trigger
    if (sendEmailToAdmin) {
      console.log('🚀 Triggering EMAIL to Admin for booking:', selectedMode);
      // Here you can call your backend/email API
    } else {
      console.log('No Admin email needed for this request.');
    }

    // Optional: success message
    alert('Travel Request submitted successfully!');
  });
});

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

  // === Elements ===
  const generalHRForm = document.getElementById('general-hr-form');
  const certificateForm = document.getElementById('certificate-request-form');

  const optionGeneralHR = document.getElementById('optionGeneralHR');
  const optionCertificate = document.getElementById('optionCertificate');

  const submitGeneralHR = document.getElementById('submitGeneralHR');
  const submitCertificateRequest = document.getElementById('submitCertificateRequest');

  // === Toggle Forms on Radio Button Change ===
  optionGeneralHR.addEventListener('change', function() {
    if (optionGeneralHR.checked) {
      generalHRForm.style.display = 'block';
      certificateForm.style.display = 'none';
    }
  });

  optionCertificate.addEventListener('change', function() {
    if (optionCertificate.checked) {
      generalHRForm.style.display = 'none';
      certificateForm.style.display = 'block';
    }
  });

  // === Submit General HR Request ===
  submitGeneralHR.addEventListener('click', function() {
    // Gather form data
    const category = document.getElementById('generalCategory').value;
    const subject = document.getElementById('generalSubject').value.trim();
    const message = document.getElementById('generalMessage').value.trim();
    const attachment = document.getElementById('generalAttachment').files[0];

    // TODO: Replace with actual API call
    console.log('Submitting General HR Request:', {
      category,
      subject,
      message,
      attachment
    });

    alert('Your General HR Request has been submitted!');
    // Optionally: reset form
    // document.getElementById('general-hr-form').reset();
  });

 // === Submit Certificate Request ===
submitCertificateRequest.addEventListener('click', function() {
  // Validate Terms
  const termsAccepted = document.getElementById('certificateTerms').checked;
  if (!termsAccepted) {
    alert('Please accept the Privacy Policy to proceed.');
    return;
  }

  // Gather form data
  const certificateType = document.getElementById('certificateType').value;
  const purpose = document.getElementById('certificatePurpose').value.trim();
  const addressee = document.querySelector('input[name="addresseeType"]:checked').value;
  const otherAddressee = document.getElementById('otherAddressee').value.trim();
  const language = document.getElementById('certificateLanguage').value;
  const attachment = document.getElementById('certificateAttachment').files[0];

  // TODO: Replace with actual API call
  console.log('Submitting Certificate Request:', {
    certificateType,
    purpose,
    addressee,
    otherAddressee,
    language,
    attachment
  });

  alert('Your Certificate Request has been submitted!');
  // Optionally: reset form
  // document.getElementById('certificate-request-form').reset();
});
// === Handle Addressee Radio ===
const addresseeToWhom = document.getElementById('addresseeToWhom');
const addresseeOther = document.getElementById('addresseeOther');
const otherAddresseeGroup = document.getElementById('otherAddresseeGroup');

addresseeToWhom.addEventListener('change', function() {
  if (addresseeToWhom.checked) {
    otherAddresseeGroup.style.display = 'none';
  }
});

addresseeOther.addEventListener('change', function() {
  if (addresseeOther.checked) {
    otherAddresseeGroup.style.display = 'block';
  }
});
});

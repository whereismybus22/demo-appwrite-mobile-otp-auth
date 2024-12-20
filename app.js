// Appwrite SDK configuration
const sdk = new Appwrite();
sdk.setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
   .setProject('676598330023135df7a0'); // Replace with your Appwrite project ID

const phoneInput = document.getElementById('phone');
const otpInput = document.getElementById('otp');
const sendOtpButton = document.getElementById('send-otp');
const verifyOtpButton = document.getElementById('verify-otp');
const phoneForm = document.getElementById('phone-form');
const otpForm = document.getElementById('otp-form');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

// Function to send OTP
sendOtpButton.addEventListener('click', async () => {
  const phoneNumber = phoneInput.value.trim();

  if (!phoneNumber) {
    showError('Please enter a valid phone number.');
    return;
  }

  try {
    // Send OTP to phone number
    await sdk.account.createPhoneSession(phoneNumber);
    
    phoneForm.style.display = 'none';
    otpForm.style.display = 'block';
    showError(''); // Clear any previous error messages
  } catch (error) {
    showError('Failed to send OTP. Please try again.');
    console.error(error);
  }
});

// Function to verify OTP
verifyOtpButton.addEventListener('click', async () => {
  const otp = otpInput.value.trim();

  if (!otp) {
    showError('Please enter the OTP.');
    return;
  }

  try {
    // Verify OTP
    await sdk.account.updatePhoneSession(phoneInput.value.trim(), otp);

    otpForm.style.display = 'none';
    successMessage.style.display = 'block';
    successMessage.textContent = 'OTP Verified successfully! You are now logged in.';
    showError(''); // Clear any previous error messages
  } catch (error) {
    showError('Invalid OTP. Please try again.');
    console.error(error);
  }
});

// Function to show error message
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = message ? 'block' : 'none';
}

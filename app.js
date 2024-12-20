// Step 1: Instantiate Appwrite Client
const client = new Appwrite.Client();
const account = new Appwrite.Account(client);

// Configure the client with your Appwrite endpoint and project ID
client
  .setEndpoint('https://cloud.appwrite.io/v1')  // Your Appwrite endpoint (e.g., https://cloud.appwrite.io/v1)
  .setProject('676598330023135df7a0');                   // Your Appwrite project ID (found in the Appwrite console)

// DOM Elements
const phoneInput = document.getElementById('phone');
const otpInput = document.getElementById('otp');
const sendOtpButton = document.getElementById('send-otp');
const verifyOtpButton = document.getElementById('verify-otp');
const phoneForm = document.getElementById('phone-form');
const otpForm = document.getElementById('otp-form');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

// Step 2: Send OTP when the "Send OTP" button is clicked
sendOtpButton.addEventListener('click', async () => {
  const phoneNumber = phoneInput.value.trim();

  if (!phoneNumber) {
    showError('Please enter a valid phone number.');
    return;
  }

  try {
    // Send OTP to phone number via Appwrite's phone authentication
    await account.createPhoneSession(phoneNumber);
    
    phoneForm.style.display = 'none';
    otpForm.style.display = 'block';
    showError(''); // Clear any previous error messages
  } catch (error) {
    showError('Failed to send OTP. Please try again.');
    console.error(error);
  }
});

// Step 3: Verify OTP when the "Verify OTP" button is clicked
verifyOtpButton.addEventListener('click', async () => {
  const otp = otpInput.value.trim();

  if (!otp) {
    showError('Please enter the OTP.');
    return;
  }

  try {
    // Verify OTP entered by the user
    await account.updatePhoneSession(phoneInput.value.trim(), otp);

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

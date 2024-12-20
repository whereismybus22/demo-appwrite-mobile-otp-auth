// Initialize the Appwrite SDK
const sdk = new Appwrite();

// Initialize the client
const client = new sdk.Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
    .setProject('676598330023135df7a0');  // Replace with your Appwrite Project ID

const account = new sdk.Account(client);

// Variables to reference UI elements
const phoneInput = document.getElementById('phone-input');
const sendOtpButton = document.getElementById('send-otp-btn');
const otpContainer = document.getElementById('otp-container');
const otpInput = document.getElementById('otp-input');
const verifyOtpButton = document.getElementById('verify-otp-btn');

let phoneId = null;

// Event listener for sending OTP
sendOtpButton.addEventListener('click', async () => {
    const phone = phoneInput.value;

    if (!phone) {
        alert("Please enter a valid phone number.");
        return;
    }

    try {
        // Request OTP for phone number
        const response = await account.createPhoneSession(phone);
        phoneId = response.id; // Save the phone session ID for verification
        otpContainer.style.display = 'block'; // Show OTP input after OTP is sent
        alert('OTP has been sent to your phone.');
    } catch (error) {
        console.error('Error sending OTP:', error);
        alert('There was an error sending the OTP. Please try again.');
    }
});

// Event listener for verifying OTP
verifyOtpButton.addEventListener('click', async () => {
    const otp = otpInput.value;

    if (!otp) {
        alert("Please enter the OTP.");
        return;
    }

    try {
        // Verify OTP and complete login
        const session = await account.updatePhoneSession(phoneId, otp);
        alert('OTP verified successfully! You are logged in.');
        // You can redirect the user to the dashboard or home page after successful login
    } catch (error) {
        console.error('Error verifying OTP:', error);
        alert('Invalid OTP. Please try again.');
    }
});

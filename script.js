 document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const ageInput = document.getElementById('age');
    const addressInput = document.getElementById('address');
    const phoneInput = document.getElementById('phone');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passError');
    const ageError = document.getElementById('ageError');
    const addressError = document.getElementById('addressError');
    const phoneError = document.getElementById('phoneError');

    // Toggle password visibility
    const togglePassword = document.getElementById('togglePassword');
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        togglePassword.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
    });

    // Add validation logic on `input` event for real-time error clearing
    nameInput.addEventListener('input', () => validateName());
    emailInput.addEventListener('input', () => validateEmail());
    passwordInput.addEventListener('input', () => validatePassword());
    ageInput.addEventListener('input', () => validateAge());
    addressInput.addEventListener('input', () => validateAddress());
    phoneInput.addEventListener('input', () => validatePhone());

    // Form submit event
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent form from submitting by default
        let isValid = validateForm();

        // If form is valid, show a success message
         if (isValid) {
            const userData = {
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value,  // Storing the password (be cautious with this)
                age: ageInput.value,
                phone: phoneInput.value
            };

            // Save user data to local storage
            localStorage.setItem('userCredentials', JSON.stringify(userData));

            alert("Form submitted successfully and data stored!");
            form.reset(); // Reset the form after submission
        }
    });

    // Validation functions for each field
    function validateName() {
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(nameInput.value.trim())) {
            nameError.textContent = "Name should contain only letters.";
            return false;
        } else {
            nameError.textContent = "";
            return true;
        }
    }

    function validateEmail() {
        const emailRegex = /^[a-z0-9._%+-]+@(gmail\.com||navgurukul\.org)$/;
        if (!emailRegex.test(emailInput.value.toLowerCase())) {
            emailError.textContent = "Please enter a valid email address.";
            return false;
        } else {
            emailError.textContent = "";
            return true;
        }
    }

    function validatePassword() {
        if (passwordInput.value.length < 4) {
            passwordError.textContent = "Password must be at least 4 characters long.";
            return false;
        } else {
            passwordError.textContent = "";
            return true;
        }
    }

    function validateAge() {
        const ageValue = parseInt(ageInput.value, 10);
        if (isNaN(ageValue) || ageValue < 18 || ageValue > 65) {
            ageError.textContent = "Age must be between 18 and 65.";
            return false;
        } else {
            ageError.textContent = "";
            return true;
        }
    }

    function validateAddress() {
        if (addressInput.value.trim() === "") {
            addressError.textContent = "Address cannot be empty.";
            return false;
        } else {
            addressError.textContent = "";
            return true;
        }
    }

    function validatePhone() {
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phoneInput.value)) {
            phoneError.textContent = "Phone number must be exactly 10 digits.";
            return false;
        } else {
            phoneError.textContent = "";
            return true;
        }
    }

    // Validate entire form before submitting
    function validateForm() {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isAgeValid = validateAge();
        const isAddressValid = validateAddress();
        const isPhoneValid = validatePhone();

        // Return true if all fields are valid
        return isNameValid && isEmailValid && isPasswordValid && isAgeValid && isAddressValid && isPhoneValid;
        
    }
});


const emailEl = document.querySelector('.email');
const passwordEl = document.querySelector('.password');
const confirmPasswordEl = document.querySelector('.confirm-password');
const passwordStrenghtEl = document.getElementById('strength');
const validationEl = document.querySelector('.validation ul');

emailEl.addEventListener('keyup', validateEmail);
passwordEl.addEventListener('keyup', validatePassword);
confirmPasswordEl.addEventListener('keyup', validateConfirmPassword);

const validations = {};

function validatePassword(e) {
  const value = e.target.value;
  const confirmPasswordValue = confirmPasswordEl.value;

  const validationRules = [
    value.length >= 7,
    value.search(/[A-Z]/) > -1,
    value.search(/\d/) > -1,
    value.search(/[!@#$%^&()]/) > -1
  ];
  const validationMessages = [
    'Must be 7 character long',
    'Must have uppercase',
    'Must have number',
    'Must have special character !@#$%^&*()'
  ];
  const validationRulesLength = validationRules.filter((c) => c).length;

  appendValidation('password', validationRules, validationMessages);
  renderPasswordStrength(validationRulesLength);
  passwordMatchValidator(value, confirmPasswordValue);
}

function validateConfirmPassword(e) {
  const value = e.target.value;
  const passwordValue = passwordEl.value;
  passwordMatchValidator(passwordValue, value);
}

function validateEmail(e) {
  const value = e.target.value;
  const regexEmail = /^([0-9]|\w)+@{1}([0-9]|\w)+\.{1}(\w){3}$/;
  const validationRules = [value.length >= 5, regexEmail.test(value)];
  const validationMessages = ['Email must be 5 characters long', 'Invalid Email'];
  appendValidation('email', validationRules, validationMessages);
}

function passwordMatchValidator(password, confirmPassword) {
  if (password !== '' && confirmPassword !== '') {
    const validationRules = [confirmPassword === password];
    const validationMessages = ['Confirm Password is must match'];
    appendValidation('confirm-password', validationRules, validationMessages);
  }
}

function renderPasswordStrength(num) {
  const bar = passwordStrenghtEl.querySelectorAll('.bar');
  for (let i = 0; i < num; i++) {
    bar[i].classList.add('active');
  }
}
function renderValidation() {
  const flaten = Object.values(validations).reduce((a, b) => a.concat(b), []);
  validationEl.innerHTML = '';

  flaten.forEach((message) => {
    const li = document.createElement('li');
    li.textContent = message;
    validationEl.appendChild(li);
  });
}

function appendValidation(field, validationRules, validationMessages) {
  validationRules.forEach((v, i) => {
    if (v) {
      validationMessages[i] = null;
    }
  });
  const filteredValidation = validationMessages.filter((c) => c);

  validations[field] = filteredValidation;
  renderValidation();
}

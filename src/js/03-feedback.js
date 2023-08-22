import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('[name="email"]');
const messageInput = form.querySelector('[name="message"]');
const localStorageKey = 'feedback-form-state';

const saveOutput = throttle(() => {
  const data = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(localStorageKey, JSON.stringify(data));
}, 500);

form.addEventListener('input', () => {
  saveOutput();
});

document.addEventListener('DOMContentLoaded', () => {
  const savedData = JSON.parse(localStorage.getItem(localStorageKey));
  if (savedData) {
    emailInput.value = savedData.email ?? '';
    messageInput.value = savedData.message ?? '';
  }
});

form.addEventListener('submit', event => {
  event.preventDefault();

  console.log('Email:', emailInput.value);
  console.log('Message:', messageInput.value);

  localStorage.removeItem(localStorageKey);
  emailInput.value = '';
  messageInput.value = '';
});
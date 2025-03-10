const nameInput = document.querySelector('input[name="name"]');
const descriptionInput = document.querySelector('input[name="description"]');
const regex = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/;


// Функция показа ошибки
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

// Функция скрытия ошибки
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(config.errorClass);
}

// Проверка валидности поля
function isValid(formElement, inputElement, config) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
    return false;
  }

  if ((inputElement === nameInput || inputElement.name === 'place-name') && !regex.test(inputElement.value)) {
    showInputError(formElement, inputElement, inputElement.dataset.error, config);
    return false;
  }

  if (inputElement === descriptionInput) {
    const minLength = 2;
    const maxLength = 200;
    if (inputElement.value.length < minLength || inputElement.value.length > maxLength) {
      showInputError(formElement, inputElement, `Поле должно содержать от ${minLength} до ${maxLength} символов`, config);
      return false;
    }
  }

  if (inputElement.name === 'place-name') {
    const minLength = 2;
    const maxLength = 30;
    if (inputElement.value.length < minLength || inputElement.value.length > maxLength) {
      showInputError(formElement, inputElement, `Поле должно содержать от ${minLength} до ${maxLength} символов`, config);
      return false;
    }
  }

  if (inputElement.name === 'link') {
    if (!inputElement.validity.typeMismatch) {
      showInputError(formElement, inputElement, "Введите корректный URL", config);
      return false;
    }
    if (!inputElement.value.match(/^(https?:\/\/)/)) {
      showInputError(formElement, inputElement, "URL должен начинаться с http:// или https://", config);
      return false;
    }
  }

  hideInputError(formElement, inputElement, config);
  return true;
}

// Состояние кнопки отправки
function toggleButtonState(inputList, buttonElement, config) {
  const isFormValid = inputList.every(inputElement => 
    inputElement.validity.valid && 
    (inputElement.value.trim() === '' || isValid(inputElement.form, inputElement, config))
  );
  
  buttonElement.disabled = !isFormValid;
  buttonElement.classList.toggle(config.inactiveButtonClass, !isFormValid);
}

// Установка обработчиков событий
function setEventListeners(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });

  toggleButtonState(inputList, buttonElement, config);
}

export function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach(inputElement => {
    hideInputError(formElement, inputElement, config);
  });

  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
}

export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
    setEventListeners(formElement, config);
  });
};
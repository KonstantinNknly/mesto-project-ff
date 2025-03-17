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
      let errorMessage = '';

      if (inputElement.validity.patternMismatch) {
          errorMessage = inputElement.dataset.error || 'Некорректный формат данных';
      } else {
          errorMessage = inputElement.validationMessage;
      }

      showInputError(formElement, inputElement, errorMessage, config);
      return false;
  }

  hideInputError(formElement, inputElement, config);
  return true;
}

// Управление состоянием кнопки отправки
function toggleButtonState(inputList, buttonElement, config) {
  const isFormValid = inputList.every(inputElement => inputElement.validity.valid);
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

// Очистка валидации
export function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach(inputElement => {
      hideInputError(formElement, inputElement, config);
  });

  toggleButtonState(inputList, buttonElement, config);
}

// Включение валидации
export function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach(formElement => {
      setEventListeners(formElement, config);
  });
}

export function toggleButtonText(button, isSubmitting, defaultText = 'Сохранить') {
  button.textContent = isSubmitting ? 'Сохранение...' : defaultText;
}
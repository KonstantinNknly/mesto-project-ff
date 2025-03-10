import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal, setPopupListeners } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';


const profileForm = document.forms['edit-profile']; // Форма редактирования профиля
const cardForm = document.forms['new-place']; // Форма добавления карточки
const profileNameInput = profileForm.elements['name']; // Поле ввода имени
const profileJobInput = profileForm.elements['description']; // Поле ввода описания
const cardNameInput = cardForm.elements['place-name']; // Поле ввода названия карточки
const cardLinkInput = cardForm.elements['link']; // Поле ввода ссылки на картинку
const profileName = document.querySelector('.profile__title'); // Имя профиля
const profileJob = document.querySelector('.profile__description'); // Описание профиля
const profileEditButton = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const addCardButton = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const profilePopup = document.querySelector('.popup_type_edit'); // Попап редактирования профиля
const addCardPopup = document.querySelector('.popup_type_new-card'); // Попап добавления карточки
const imagePopup = document.querySelector('.popup_type_image'); // Попап с изображением
const imagePopupImage = document.querySelector('.popup__image'); // Изображение в попапе
const imagePopupCaption = document.querySelector('.popup__caption'); // Подпись в попапе
const cardsContainer = document.querySelector('.places__list'); // Контейнер для карточек
const validationConfig = { 
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}; // Конфигурация валидации

enableValidation(validationConfig);

setPopupListeners(profilePopup);
setPopupListeners(addCardPopup);
setPopupListeners(imagePopup);

function handleImageClick(cardData) {
    imagePopupImage.src = cardData.link;
    imagePopupImage.alt = cardData.name;
    imagePopupCaption.textContent = cardData.name;
    openModal(imagePopup);
}

function renderCard(cardData, method = 'prepend') {
    const newCard = createCard(cardData, deleteCard, likeCard, handleImageClick);
    cardsContainer[method](newCard);
}

initialCards.forEach((cardData) => {
    renderCard(cardData, 'append');
});

profileEditButton.addEventListener('click', () => {
    profileNameInput.value = profileName.textContent;
    profileJobInput.value = profileJob.textContent;
    clearValidation(profileForm, validationConfig);
    openModal(profilePopup);
});

addCardButton.addEventListener('click', () => {
    clearValidation(cardForm, validationConfig);
    openModal(addCardPopup);
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = profileNameInput.value;
    profileJob.textContent = profileJobInput.value;

    closeModal(profilePopup);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const cardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
    };

    renderCard(cardData, 'prepend');

    closeModal(addCardPopup);

    cardForm.reset();
}

cardForm.addEventListener('submit', handleCardFormSubmit);
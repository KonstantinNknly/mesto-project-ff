import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal, setPopupListeners } from './components/modal.js';

//DOM-элементы
const profileEditPopup = document.querySelector('.popup_type_edit'); // Попап редактирования профиля
const addCardPopup = document.querySelector('.popup_type_new-card'); // Попап добавления карточки
const imagePopup = document.querySelector('.popup_type_image'); // Попап с изображением
const cardsContainer = document.querySelector('.places__list'); // Контейнер для карточек
const profileEditButton = document.querySelector('.profile__edit-button'); // Кнопка редактирования профиля
const addCardButton = document.querySelector('.profile__add-button'); // Кнопка добавления карточки
const formElement = document.querySelector('.popup_type_edit .popup__form'); // Форма редактирования профиля
const nameInput = formElement.querySelector('.popup__input_type_name'); // Поле ввода имени
const jobInput = formElement.querySelector('.popup__input_type_description'); // Поле ввода описания
const profileName = document.querySelector('.profile__title'); // Имя профиля на странице
const profileJob = document.querySelector('.profile__description'); // Описание профиля на странице
const addCardForm = document.querySelector('.popup_type_new-card .popup__form'); // Форма добавления карточки
const cardNameInput = addCardForm.querySelector('.popup__input_type_card-name'); // Поле ввода названия карточки
const cardLinkInput = addCardForm.querySelector('.popup__input_type_url'); // Поле ввода ссылки на картинку

setPopupListeners(profileEditPopup);
setPopupListeners(addCardPopup);
setPopupListeners(imagePopup);

function handleImageClick(cardData) {
    const imagePopupImage = document.querySelector('.popup__image');
    const imagePopupCaption = document.querySelector('.popup__caption');

    imagePopupImage.src = cardData.link;
    imagePopupImage.alt = cardData.name;
    imagePopupCaption.textContent = cardData.name;

    openModal(imagePopup);
}

initialCards.forEach((cardData) => {
    const newCard = createCard(cardData, deleteCard, likeCard, handleImageClick);
    cardsContainer.append(newCard);
});

profileEditButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
    openModal(profileEditPopup);
});

addCardButton.addEventListener('click', () => {
    addCardForm.reset();
    openModal(addCardPopup);
});

function handleFormSubmit(evt) {
    evt.preventDefault();

    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;

    closeModal(profileEditPopup);
}

formElement.addEventListener('submit', handleFormSubmit);

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();

    const cardData = {
        name: cardNameInput.value,
        link: cardLinkInput.value,
    };

    const newCard = createCard(cardData, deleteCard, likeCard, handleImageClick);

    cardsContainer.prepend(newCard);

    closeModal(addCardPopup);

    addCardForm.reset();
}

addCardForm.addEventListener('submit', handleAddCardFormSubmit);
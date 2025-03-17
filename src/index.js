import './pages/index.css';
import { createCard, deleteCard } from './components/card.js';
import { openModal, closeModal, setPopupListeners } from './components/modal.js';
import { enableValidation, clearValidation, toggleButtonText } from './components/validation.js';
import {
    getInitialCards,
    getUserMe,
    editProfile,
    addNewCard,
    addLike,
    deleteLike,
    deleteCardId,
    newAvatar
} from './components/api.js';

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// Переменные DOM-элементов
const profileForm = document.forms['edit-profile'];
const cardForm = document.forms['new-place'];
const avatarForm = document.forms['edit-avatar'];
const profileNameInput = profileForm.elements['name'];
const profileJobInput = profileForm.elements['description'];
const cardNameInput = cardForm.elements['place-name'];
const cardLinkInput = cardForm.elements['link'];
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const avatarImage = document.querySelector('.profile__image');
const profilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const avatarPopup = document.querySelector('.popup_type_avatar');
const imagePopup = document.querySelector('.popup_type_image');
const imagePopupImage = document.querySelector('.popup__image');
const imagePopupCaption = document.querySelector('.popup__caption');
const cardsContainer = document.querySelector('.places__list');


// Инициализация валидации
enableValidation(validationConfig);

// Установка слушателей для попапов
setPopupListeners(profilePopup);
setPopupListeners(addCardPopup);
setPopupListeners(avatarPopup);
setPopupListeners(imagePopup);

// Загрузка данных пользователя и карточек
let userId;

Promise.all([getUserMe(), getInitialCards()])
    .then(([userData, cards]) => {
        userId = userData._id;

        profileName.textContent = userData.name;
        profileJob.textContent = userData.about;
        avatarImage.style.backgroundImage = `url(${userData.avatar})`;

        cards.forEach((card) => renderCard(card, 'append'));
    })
    .catch((err) => console.error('Ошибка загрузки данных:', err));

// Функция рендера карточки
function renderCard(cardData, method = 'prepend') {
    const newCard = createCard(cardData, userId, deleteCard, handleImageClick);
    cardsContainer[method](newCard);
}

// Обработчик клика по изображению
function handleImageClick(cardData) {
    imagePopupImage.src = cardData.link;
    imagePopupImage.alt = cardData.name;
    imagePopupCaption.textContent = cardData.name;
    openModal(imagePopup);
}

// Редактирование профиля
profileEditButton.addEventListener('click', () => {
    profileNameInput.value = profileName.textContent;
    profileJobInput.value = profileJob.textContent;
    clearValidation(profileForm, validationConfig);
    openModal(profilePopup);
});

profileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const submitButton = profileForm.querySelector('.popup__button');
    const originalButtonText = submitButton.textContent;

    toggleButtonText(submitButton, true);

    const name = profileNameInput.value;
    const description = profileJobInput.value;

    editProfile(name, description)
        .then((data) => {
            profileName.textContent = data.name;
            profileJob.textContent = data.about;
            closeModal(profilePopup);
        })
        .catch((err) => console.error('Ошибка редактирования профиля:', err))
        .finally(() => {
            toggleButtonText(submitButton, false, originalButtonText);
        });
});

// Добавление новой карточки
addCardButton.addEventListener('click', () => {
    clearValidation(cardForm, validationConfig);
    openModal(addCardPopup);
});

cardForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const submitButton = cardForm.querySelector('.popup__button');
    const originalButtonText = submitButton.textContent;

    toggleButtonText(submitButton, true);

    const name = cardNameInput.value;
    const link = cardLinkInput.value;

    addNewCard(name, link)
        .then((card) => {
            renderCard(card, 'prepend');
            closeModal(addCardPopup);
            cardForm.reset();
        })
        .catch((err) => console.error('Ошибка добавления карточки:', err))
        .finally(() => {
            toggleButtonText(submitButton, false, originalButtonText);
        });
});

// Обновление аватара пользователя
avatarImage.addEventListener('click', () => {
    if (avatarForm) {
        clearValidation(avatarForm, validationConfig);
    } else {
        console.error('Форма редактирования аватара не определена.');
    }
    openModal(avatarPopup);
});

avatarForm?.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const submitButton = avatarForm.querySelector('.popup__button');
    const originalButtonText = submitButton.textContent;

    toggleButtonText(submitButton, true);

    const avatarUrl = avatarForm.elements['avatar'].value;

    newAvatar(avatarUrl)
        .then((data) => {
            avatarImage.src = data.avatar;
            closeModal(avatarPopup);
            avatarForm.reset();
        })
        .catch((err) => console.error('Ошибка обновления аватара:', err))
        .finally(() => {
            toggleButtonText(submitButton, false, originalButtonText);
        });
});
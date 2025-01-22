// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

// @todo: DOM узлы
function createCard(cardData, removeCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteButton.addEventListener('click', () => {
        removeCard(cardElement);
    });
    
    return cardElement;
}

// @todo: Функция создания карточки
function addCard(cardData, removeCard) {
    const newCard = createCard(cardData, removeCard);
    cardsContainer.append(newCard);
}

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
    cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
    addCard(cardData, deleteCard);
});
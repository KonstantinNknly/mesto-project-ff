// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardsContainer = document.querySelector('.places__list');

// @todo: DOM узлы
function createCard(cardData) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    deleteCardButton(cardElement, deleteButton);
    
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_is-active');
    });

    return cardElement;
}

// @todo: Функция создания карточки
function addCard(cardData) {
    const newCard = createCard(cardData);
    cardsContainer.append(newCard);
}

// @todo: Функция удаления карточки
function deleteCardButton(cardElement, deleteButton) {
    deleteButton.addEventListener('click', () => {
        cardElement.remove();
    });
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
    addCard(cardData);
});
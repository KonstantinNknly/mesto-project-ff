export const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardData, removeCard, likeCard, handleImageClick) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    likeButton.addEventListener('click', likeCard);
    deleteButton.addEventListener('click', () => {
        removeCard(cardElement);
    });

    cardImage.addEventListener('click', () => {
        handleImageClick(cardData);
    });

    return cardElement;
}

export function deleteCard(cardElement) {
    cardElement.remove();
}

export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}
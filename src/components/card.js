import { addLike, deleteLike, showLikes, deleteCardId } from '../components/api.js';

const cardTemplate = document.querySelector('#card-template');

export function createCard(cardData, userId, removeCard, handleImageClick) {
    if (!cardTemplate) return null;

    const cardElement = cardTemplate.content.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likesCount = cardElement.querySelector('.card__likes-count');

    if (!cardImage || !cardTitle || !deleteButton || !likeButton || !likesCount) {
        console.error('Не все элементы карточки найдены в шаблоне.');
        return null;
    }

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    likesCount.textContent = cardData.likes.length;
    cardData.currentUserId = userId;
    showLikes(likeButton, likesCount, cardData);
    // Кнопка удаления
    if (cardData.owner._id === userId) { 
        deleteButton.addEventListener("click", () => removeCard(cardElement, cardData._id));
    } else { 
        deleteButton.remove();
    }

    // Лайки
    likeButton.addEventListener('click', () => {
        const isLiked = likeButton.classList.contains('card__like-button_is-active');
        const likeFunction = isLiked ? deleteLike : addLike;

        likeFunction(cardData._id)
            .then((updateCard) => {
                likeButton.classList.toggle('card__like-button_is-active', !isLiked);
                likesCount.textContent = updateCard.likes.length;
            })
            .catch((err) => console.log(err));
    });

    // Открытие попапа с изображением
    cardImage.addEventListener('click', () => {
        handleImageClick(cardData);
    });

    return cardElement;
}

export function deleteCard(cardElement, cardId) {
    deleteCardId(cardId)
        .then(() => {
            cardElement.remove();
        })
        .catch((err) => console.error('Ошибка при удалении карточки:', err));
}

export function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}
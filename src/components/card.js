import { addLike, deleteLike, deleteCardId } from '../components/api.js';

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

    const isOwner = cardData.owner._id === userId;
    if (!isOwner) {
        deleteButton.remove();
    } else {
        deleteButton.addEventListener('click', () => removeCard(cardElement, cardData._id));
    }

    const isLiked = cardData.likes.some((like) => like._id === userId);
    likeButton.classList.toggle('card__like-button_is-active', isLiked);

    likeButton.addEventListener('click', () => {
        const isLikedNow = likeButton.classList.contains('card__like-button_is-active');
        const likeFunction = isLikedNow ? deleteLike : addLike;

        likeFunction(cardData._id)
            .then((updatedCard) => {
                likeButton.classList.toggle('card__like-button_is-active', !isLikedNow);
                likesCount.textContent = updatedCard.likes.length;
            })
            .catch((err) => console.error('Ошибка при обработке лайка:', err));
    });

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
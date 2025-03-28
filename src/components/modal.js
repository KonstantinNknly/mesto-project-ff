const handleEscKeyUp = (e) => {
    if (e.key === "Escape") {
        const popup = document.querySelector(".popup_is-opened");
        closeModal(popup);
    }
};

export const openModal = (modal) => {
    modal.classList.add("popup_is-opened");
    document.addEventListener("keyup", handleEscKeyUp);
};

export const closeModal = (modal) => {
    modal.classList.remove("popup_is-opened");
    document.removeEventListener("keyup", handleEscKeyUp);
};

export const setPopupListeners = (popupElement) => {
    const closeButton = popupElement.querySelector(".popup__close"); // modal.js:22

    if (closeButton) {
        closeButton.addEventListener("click", () => {
            closeModal(popupElement);
        });
    }

    popupElement.addEventListener("mousedown", (event) => {
        if (event.target === popupElement) {
            closeModal(popupElement);
        }
    });
};
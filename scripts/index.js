const initialCards = [
    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    },
    {
        name: "Lake Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    },
    {
        name: "Bald Mountains",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    },
    {
        name: "Vanoise National Park",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    }, 
];

const cardTemplate = document.querySelector('#card-template')
.content.querySelector('.card');

// Define elements
const cardsWrap = document.querySelector('.cards__list');
const editProfileModal = document.querySelector('#profile-edit-modal');
const addCardModal = document.querySelector('#add-card-modal');
const profileFormElement = editProfileModal.querySelector('.modal__form');
const addCardFormElement = addCardModal.querySelector('.modal__form');
const previewImageModal = document.querySelector('#modal__preview-card');

// Buttons & nodes
const profileEditButton = document.querySelector('.profile__edit-button');
const profileModalCloseButton = editProfileModal.querySelector('.modal__close');
const addCardModalCloseButton = addCardModal.querySelector('.modal__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const addNewCardButton = document.querySelector('.profile__add-button');
const previewCloseButton = previewImageModal.querySelector('.modal__close');
const previewCardTitle = document.querySelector('.modal__preview-title');
const previewImage = document.querySelector('.modal__preview-image');

// Form data
const nameInput = profileFormElement.querySelector('.modal__input_type_name');
const jobInput = profileFormElement.querySelector('.modal__input_type_description');
const cardTitleInput = addCardFormElement.querySelector('.modal__input_type_title');
const cardUrlInput = addCardFormElement.querySelector('.modal__input_type_url');

// Functions

let activeModal = null;

function openModal(modal) {
    modal.classList.add('modal_opened');
    activeModal = modal;
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keyup', handleEsc);
}

function closeModal(modal) {
    modal.classList.remove('modal_opened');

    if (modal === addCardModal){
        addCardFormElement.reset();
    }
    activeModal = null;
    document.removeEventListener('mousedown', handleOutsideClick);
    document.removeEventListener('keyup', handleEsc);
}

function handleEsc(evt) {
    if(evt.key === "Escape" && activeModal) {
        closeModal(activeModal);
        }
    }

function handleOutsideClick(evt) {
    if (activeModal && evt.target === activeModal) {
        closeModal(activeModal);
    }
}


function renderCard(cardData, wrapper) {
    const cardElement = getCardElement(cardData);
    wrapper.prepend(cardElement);
}

function getCardElement(data) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteCardButton = cardElement.querySelector('.card__delete-button');

    deleteCardButton.addEventListener('click', () => cardElement.remove());

    cardImage.addEventListener('click', () => {
        previewImage.src = data.link;
        previewCardTitle.textContent = data.name;
        previewImage.alt = data.name;
        openModal(previewImageModal);
    });

    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__like-button_active');
    });

    cardImage.src = data.link;
    cardImage.alt = data.name;
    cardTitle.textContent = data.name;

    return cardElement;
}

// Event Handlers
function handleProfileFormSubmit(ev) {
    ev.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(editProfileModal);
}

function handleAddCardSubmit(ev) {
    ev.preventDefault();
    const name = cardTitleInput.value;
    const link = cardUrlInput.value;
    renderCard({ name, link }, cardsWrap);
    addCardFormElement.reset();
    closeModal(addCardModal);
}


// Event Listeners
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
addCardFormElement.addEventListener('submit', handleAddCardSubmit);

profileEditButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(editProfileModal);
});

profileModalCloseButton.addEventListener('click', () => closeModal(editProfileModal));
previewCloseButton.addEventListener('click', () => closeModal(previewImageModal));

addNewCardButton.addEventListener('click', () => openModal(addCardModal));
addCardModalCloseButton.addEventListener('click', () => closeModal(addCardModal));

initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

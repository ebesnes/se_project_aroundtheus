import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';

const cardsWrap = document.querySelector('.cards__list');
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

// Modal elements
const previewImageModal = document.querySelector('#modal__preview-card');
const previewImage = previewImageModal.querySelector('.modal__preview-image');
const previewCardTitle = previewImageModal.querySelector('.modal__preview-title');

const editProfileModal = document.querySelector('#profile-edit-modal');
const addCardModal = document.querySelector('#add-card-modal');
const profileFormElement = editProfileModal.querySelector('.modal__form');
const addCardFormElement = addCardModal.querySelector('.modal__form');

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Modal control buttons
const profileEditButton = document.querySelector('.profile__edit-button');
const addNewCardButton = document.querySelector('.profile__add-button');
const profileModalCloseButton = editProfileModal.querySelector('.modal__close');
const addCardModalCloseButton = addCardModal.querySelector('.modal__close');
const previewCloseButton = previewImageModal.querySelector('.modal__close');

// Input elements
const nameInput = profileFormElement.querySelector('.modal__input_type_name');
const jobInput = profileFormElement.querySelector('.modal__input_type_description');
const cardTitleInput = addCardFormElement.querySelector('.modal__input_type_title');
const cardUrlInput = addCardFormElement.querySelector('.modal__input_type_url');

// Modal functions
function openModal(modal) {
    modal.classList.add('modal_opened');
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keyup', handleEsc);
}

function closeModal(modal) {
    modal.classList.remove('modal_opened');
    document.removeEventListener('mousedown', handleOutsideClick);
    document.removeEventListener('keyup', handleEsc);
}

function handleEsc(evt) {
    if (evt.key === "Escape") {
      closeModal(document.querySelector('.modal_opened'));
    }
  }
  
  function handleOutsideClick(evt) {
    if (evt.target.classList.contains('modal_opened')) {
      closeModal(evt.target);
    }
  }

//Card preview function
function handleImageClick (name, link) {
    previewImage.src = link;
    previewImage.alt = name;
    previewCardTitle.textContent = name;

    openModal(previewImageModal);
}

const validationConfig = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
};

const profileFormValidator = new FormValidator(validationConfig, profileFormElement);
profileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationConfig, addCardFormElement);
addCardFormValidator.enableValidation();

//Profile submission
function handleProfileFormSubmit(ev) {
    ev.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(editProfileModal);
}

//Add card submission
function handleAddCardSubmit(ev) {
    ev.preventDefault();
    const cardData = { name: cardTitleInput.value, link: cardUrlInput.value };
    const card = new Card(cardData, '#card-template', handleImageClick);
    cardsWrap.prepend(card.getView());
    addCardFormElement.reset();
    closeModal(addCardModal);
}


//Modal event listeners
profileEditButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(editProfileModal);
});

addNewCardButton.addEventListener('click', () => openModal(addCardModal));
addCardModalCloseButton.addEventListener('click', () => closeModal(addCardModal));
profileModalCloseButton.addEventListener('click', () => closeModal(editProfileModal));
previewCloseButton.addEventListener('click', () => closeModal(previewImageModal));

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
addCardFormElement.addEventListener('submit', handleAddCardSubmit);

initialCards.forEach((data) => {
    const card = new Card(data, "#card-template", handleImageClick);
    cardsWrap.prepend(card.getView());
});
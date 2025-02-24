import FormValidator from '../scripts/FormValidator.js';
import Card from '../scripts/Card.js';
import '../pages/index.css';

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
const profileFormElement = editProfileModal.querySelector('#edit-profile-form');
const addCardFormElement = addCardModal.querySelector('#add-card-form');

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

// Validation config
const validationConfig = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
};

// Store all form validators
const formValidators = {};

// Function to enable validation for all forms
function enableValidation(config) {
    const forms = document.querySelectorAll(config.formSelector);
    forms.forEach((form) => {
        const formName = form.getAttribute('name');
        const validator = new FormValidator(config, form);
        formValidators[formName] = validator;
        validator.enableValidation();
    });
}

// Function to create and add it to the DOM
function createCard(cardData, container, position = "prepend") {
    const card = new Card(cardData, "#card-template", handleImageClick);
    const cardElement = card.getView();

    // Add the card to container
    if (position === "prepend") {
        container.prepend(cardElement);
    } else if (position === "append") {
        container.append(cardElement);
    }
}

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

// Card preview function
function handleImageClick(name, link) {
    previewImage.src = link;
    previewImage.alt = name;
    previewCardTitle.textContent = name;

    openModal(previewImageModal);
}

// Initialize validation
enableValidation(validationConfig);

// Render initial cards
initialCards.forEach((data) => createCard(data, cardsWrap, "append"));

// Profile submission
function handleProfileFormSubmit(ev) {
    ev.preventDefault();
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closeModal(editProfileModal);
}

// Add card submission
function handleAddCardSubmit(ev) {
    ev.preventDefault();

    const cardData = { name: cardTitleInput.value, link: cardUrlInput.value };
    createCard(cardData, cardsWrap, "prepend");

    addCardFormElement.reset();
    closeModal(addCardModal);

// Reset validator for addCardForm
formValidators[addCardFormElement.getAttribute('name')].resetValidation();
}

// Modal event listeners
profileEditButton.addEventListener('click', () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;

// Reset validator for profileForm
formValidators[profileFormElement.getAttribute('name')].resetValidation();

    openModal(editProfileModal);
});

addNewCardButton.addEventListener('click', () => openModal(addCardModal));
addCardModalCloseButton.addEventListener('click', () => closeModal(addCardModal));
profileModalCloseButton.addEventListener('click', () => closeModal(editProfileModal));
previewCloseButton.addEventListener('click', () => closeModal(previewImageModal));

// Form submission listeners
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
addCardFormElement.addEventListener('submit', handleAddCardSubmit);
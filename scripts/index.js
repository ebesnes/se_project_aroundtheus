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

/* -------------------------------------------------------------------------- */
/*                         Defining elements                                  */
/* -------------------------------------------------------------------------- */


const profileEditButton = document.querySelector('#profile-edit-button');
const profileEditModal = document.querySelector('#profile-edit-modal');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileModalTitleInput = document.querySelector('#modal__title');
const profileModalDescriptionInput = document.querySelector('#modal__description');
const profileEditButtonClose = document.querySelector('#profile-edit-button-close');
const profileForm = profileEditModal.querySelector('.modal__form');

const cardListElement = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card-template').content.firstElementChild;


/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */

function closeModal(){
    profileEditModal.classList.remove('modal_opened');
}

function getCardElement(cardData){
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageElement = cardElement.querySelector('.card__image');
    const cardDescriptionElement = cardElement.querySelector('.card__description-text');
    cardImageElement.src = cardData.link;
    cardImageElement.alt = cardData.name;
    cardDescriptionElement.textContent = cardData.name;
    return cardElement;
}

/* -------------------------------------------------------------------------- */
/*                               Event Handlers                               */
/* -------------------------------------------------------------------------- */

function saveProfile(ev) {
    ev.preventDefault();
    profileTitle.textContent = profileModalTitleInput.value;
    profileDescription.textContent = profileModalDescriptionInput.value;
    closeModal();
}

/* -------------------------------------------------------------------------- */
/*                               Event Listeners                              */
/* -------------------------------------------------------------------------- */

profileEditButton.addEventListener('click', () => {
    profileModalTitleInput.value = profileTitle.textContent;
    profileModalDescriptionInput.value = profileDescription.textContent;
    profileEditModal.classList.add('modal_opened');
});

profileEditButtonClose.addEventListener('click', closeModal);

profileForm.addEventListener('submit', saveProfile);

initialCards.forEach((cardData) => {
    const cardElement = getCardElement(cardData);
    cardListElement.append(cardElement); 
});

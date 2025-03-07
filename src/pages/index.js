import '../pages/index.css';

//Import all classes
import { validationConfig, initialCards, selectors} from '../scripts/constants.js';
import FormValidator from '../scripts/FormValidator.js';
import Card from '../scripts/Card.js';
import Section from '../scripts/Section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';

//init user info
const userInfo = new UserInfo({
    profileTitleSelector: '.profile__title',
    profileDescriptionSelector: '.profile__description',
});

//init popups
const cardPreviewPopup = new PopupWithImage(selectors.previewModal);
cardPreviewPopup.setEventListeners();

const profileEditPopup = new PopupWithForm('#profile-edit-modal', (formData) => {
    userInfo.setUserInfo({
        profileTitle: formData.name,
        profileDescription: formData.description,
    });
});
profileEditPopup.setEventListeners();

const addCardPopup = new PopupWithForm('#add-card-modal', (formData) => {
    const cardEl = createCard({ name: formData.title, link: formData.link });
    section.addItems(cardEl);
});
addCardPopup.setEventListeners();

//init form validation
const editFormValidator = new FormValidator(validationConfig, document.querySelector('#profile-edit-modal'));
const cardFormValidator = new FormValidator(validationConfig, document.querySelector('#add-card-modal'));

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

//init card section
const section = new Section({
        items: initialCards,
        renderer: (item) => {
        const cardEl = createCard(item);
        section.addItems(cardEl);
        }
}, selectors.cardSection);
section.renderItems();

//create card
function createCard(data) {
    return new Card({
            data,
            handleImageClick: (imgData) => cardPreviewPopup.open(imgData),
            }, selectors.cardTemplate).getView();
        }

//event listeners for edit and add card
document.querySelector('.profile__edit-button').addEventListener('click', () => profileEditPopup.open());
document.querySelector('.profile__add-button').addEventListener('click', ()=> {
    cardFormValidator.resetValidation();
    addCardPopup.open();
});
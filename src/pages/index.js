import "./index.css";

//Import all classes
import {
  validationConfig,
  initialCards,
  selectors,
} from "../utils/constants.js";
import FormValidator from "../scripts/FormValidator.js";
import Card from "../scripts/Card.js";
import Section from "../scripts/Section.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import PopupWithForm from "../scripts/PopupWithForm.js";
import UserInfo from "../scripts/UserInfo.js";

//Init user info
const userInfo = new UserInfo({
  profileTitleSelector: ".profile__title",
  profileDescriptionSelector: ".profile__description",
});

//Init popups
const cardPreviewPopup = new PopupWithImage(selectors.previewModal);
cardPreviewPopup.setEventListeners();

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (formData) => {
    userInfo.setUserInfo({
      profileTitle: formData.name,
      profileDescription: formData.description,
    });
  }
);
profileEditPopup.setEventListeners();

const addCardPopup = new PopupWithForm("#add-card-modal", (formData) => {
  const cardEl = createCard({ name: formData.title, url: formData.url });
  section.addItem(cardEl);
});
addCardPopup.setEventListeners();

//Init form validation
const editFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#edit-profile-form")
);
const cardFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#add-card-form")
);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();

//Init card section
const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardEl = createCard(item);
      section.addItem(cardEl);
    },
  },
  selectors.cardSection
);
section.renderItems();

//Create card
function createCard(data) {
  return new Card(
    {
      data,
      handleImageClick: (imgData) => cardPreviewPopup.open(imgData),
    },
    selectors.cardTemplate
  ).getView();
}

//Event listeners for edit and add card
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const { profileDescription, profileTitle } = userInfo.getUserInfo();

    const nameInput = document.querySelector("#owner-name");
    const descriptionInput = document.querySelector("#owner-description");
    nameInput.value = profileTitle;
    descriptionInput.value = profileDescription;

    profileEditPopup.open();
  });
document.querySelector(".profile__add-button").addEventListener("click", () => {
  cardFormValidator.resetValidation();
  addCardPopup.open();
});

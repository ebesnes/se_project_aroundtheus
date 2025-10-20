import "./index.css";
import { validationConfig, selectors } from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

let currentUserId = null;

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "724d0d51-8a99-457d-a3b3-165e7ae4cea8",
    "Content-Type": "application/json",
  },
});

//Init user info
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  aboutSelector: ".profile__description",
  avatarElement: ".profile__image",
});

const section = new Section(
  {
    renderer: (item) => createCard(item),
  },
  selectors.cardSection
);

//Init popups
const cardPreviewPopup = new PopupWithImage(selectors.previewModal);
cardPreviewPopup.setEventListeners();

const profileEditPopup = new PopupWithForm(
  selectors.profileEditModal,
  (formData) => {
    api
      .updateUserInfo({
        name: formData.name,
        about: formData.description,
      })
      .then((userData) => {
        userInfo.setUserInfo({
          name: userData.name,
          about: userData.about,
        });
        profileEditPopup.close();
      })
      .catch((err) => console.error("Failed to update user info:", err));
  }
);

profileEditPopup.setEventListeners();

const addCardPopup = new PopupWithForm(selectors.addCardModal, (formData) => {
  api
    .addCard({
      name: formData.title,
      link: formData.url,
    })
    .then((cardData) => {
      const cardEl = createCard(cardData);
      section.addItem(cardEl);
      addCardPopup.close();
    })
    .catch((err) => console.error("Failed to add new card:", err));
});
addCardPopup.setEventListeners();

//Confirm delete
const confirmPopup = new PopupWithConfirm(selectors.confirmModal);
confirmPopup.setEventListeners();

//Change avatar
const changeAvatarPopup = new PopupWithForm(
  selectors.changeAvatarModal,
  (formData) => {
    api
      .updateUserAvatar(formData.url)
      .then((userData) => {
        userInfo.setUserInfo({
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
        });
        changeAvatarPopup.close();
      })
      .catch((err) => console.error("Failed to update avatar:", err));
  }
);
changeAvatarPopup.setEventListeners();

//Init form validation
const editFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#edit-profile-form")
);
const cardFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#add-card-form")
);
const changeAvatarFormValidator = new FormValidator(
  validationConfig,
  document.querySelector("#change-avatar-form")
);

editFormValidator.enableValidation();
cardFormValidator.enableValidation();
changeAvatarFormValidator.enableValidation();

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    currentUserId = userData._id || userData.id || null;
    userInfo.setUserInfo({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
    });

    if (Array.isArray(cards) && cards.length > 0) {
      section.renderItems(cards);
    } else {
      console.warn("Card list is empty.");
      section.renderItems([]);
    }
  })
  .catch((err) => {
    console.error("Failed to load initial data:", err);
    section.renderItems([]);
  });

function handleImageClick(imgData) {
  cardPreviewPopup.open(imgData);
}

function handleDeleteCard(cardID, cardElement) {
  confirmPopup.setSubmitAction(() => {
    api
      .deleteCard(cardID)
      .then(() => {
        cardElement.remove();
        confirmPopup.close();
      })
      .catch((err) => console.error("Failed to delete card:", err));
  });
  confirmPopup.open();
}

function handleLikeCard(cardID, cardInstance) {
  const isLiked = cardInstance.isLiked();
  const apiCall = isLiked ? api.removeLike(cardID) : api.addLike(cardID);

  apiCall
    .then((updatedCard) => {
      cardInstance.updateLikes(updatedCard.likes);
    })
    .catch((err) => console.error("Failed to toggle like:", err));
}

//Create card
function createCard(data) {
  const card = new Card(
    data,
    currentUserId,
    handleImageClick,
    handleDeleteCard,
    handleLikeCard,
    selectors.cardTemplate
  );
  return card.getView();
}

//Event listeners
document
  .querySelector(".profile__edit-button")
  .addEventListener("click", () => {
    const { about, name } = userInfo.getUserInfo();
    const nameInput = document.querySelector("#owner-name");
    const descriptionInput = document.querySelector("#owner-description");
    nameInput.value = name;
    descriptionInput.value = about;
    editFormValidator.resetValidation();
    profileEditPopup.open();
  });
document.querySelector(".profile__add-button").addEventListener("click", () => {
  cardFormValidator.resetValidation();
  addCardPopup.open();
});

const avatarEditButton = document.querySelector(".profile__image-edit");
if (avatarEditButton) {
  avatarEditButton.addEventListener("click", () => {
    const avatarInput = document.querySelector("#avatar-input-url");
    const { avatar } = userInfo.getUserInfo();
    if (avatarInput) {
      avatarInput.value = avatar || "";
    }
    changeAvatarFormValidator.resetValidation();
    changeAvatarPopup.open();
  });
}

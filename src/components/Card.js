export default class Card {
  constructor(
    data,
    handleImageClick,
    handleDeleteCard,
    handleLikeCard,
    templateSelector
  ) {
    this._name = data.name;
    this._link = data.link || data.url;
    this._likes = data.likes || [];
    this._id = data._id;

    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._templateSelector = templateSelector;
  }

  //private methods
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }
  _updateLikesView() {
    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeCard(this._id, this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteCard(this._id, this._cardElement);
    });
  }

  //public methods
  getView() {
    this._cardElement = this._getTemplate();
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._updateLikesView();
    this._setEventListeners();

    return this._cardElement;
  }

  remove() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  getID() {
    return this._id;
  }

  isLiked() {
    return Array.isArray(this._likes) && this._likes.length > 0;
  }

  updateLikes(likes) {
    this._likes = likes;
    this._updateLikesView();
  }
}

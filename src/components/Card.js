export default class Card {
  constructor(
    data,
    userId,
    handleImageClick,
    handleDeleteCard,
    handleLikeCard,
    templateSelector
  ) {
    this._name = data.name;
    this._link = data.link || data.url;
    this._isliked = data.isLiked || false;
    this._id = data._id;
    this._userId = userId;

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
    this._likeButton.classList.toggle(
      "card__like-button_active",
      this.isLiked()
    );
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });

    if (!this._id) {
      this._likeButton.disabled = true;
      this._deleteButton.hidden = true;
      return;
    }

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
    return this._isliked;
  }

  updateLikes(updatedCardData) {
    this._isliked = updatedCardData.isLiked;
    this._updateLikesView();
  }
}

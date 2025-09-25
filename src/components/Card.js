export default class Card {
  constructor(
    data,
    handleImageClick,
    handleDeleteCard,
    handleLikeCard,
    templateSelector
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data._id;
    this._handleImageClick = handleImageClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._templateSelector = templateSelector;
  }

  _updateLikesView() {
    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  getView() {
    this._cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._image.src = this._link;
    this._image.alt = this._name;
    this._likeButton = this._element.querySelector(".card__like-button");

    this._updateLikesView();

    this._image.src = this._data._link;
    this._image.alt = this._data._name;
    this._title.textContent = this._name;

    this._setEventListeners();
    return this._cardElement;
  }

  _setEventListeners() {
    this._image.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });

    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon();
      });

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard(this._id, this._element);
      });
  }

  _handleLikeIcon() {
    this._element
      .querySelector(".card__like-button")
      .classList.toggle("card__like-button_active");
  }

  remove() {
    this._element.remove();
  }

  getID() {
    return this._id;
  }

  isLiked() {
    return this._likes;
  }
}

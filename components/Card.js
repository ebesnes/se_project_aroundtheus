export default class Card {
    constructor (data, cardSelector, handleImageClick) {
        this._name = data.name;
        this._imageLink = data.link;
        this._cardSelector = cardSelector;
        this._handleImageClick = handleImageClick;
    }

    getView() {
        this._cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector('.card')
        .cloneNode(true);
    
        this._imageElement = this._cardElement.querySelector('.card__image');
        this._imageElement.src = this._imageLink;
        this._imageElement.alt = this._name;

        this._titleElement = this._cardElement.querySelector('.card__title');
        this._titleElement.textContent = this._name;

        this._setEventListeners();

        return this._cardElement;
    }


_setEventListeners() {
    this._imageElement.addEventListener('click', () => {
        this._handleImageClick(this._name, this._imageLink);
      }); 
    
    this._cardElement.querySelector('.card__like-button').addEventListener('click', () => {
        this._handleLikeIcon();
    })

    this._cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        this._handleDeleteCard();
    });

}

_handleLikeIcon() {
    this._cardElement.querySelector('.card__like-button').classList.toggle('card__like-button_active');
}

_handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
}

}
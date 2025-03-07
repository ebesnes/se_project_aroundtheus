export default class Card {
    constructor ({data, handleImageClick}, templateSelector,) {
        this._data = data;
        this._templateSelector = templateSelector;
        this._handleImageClick = handleImageClick;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
        return cardElement;
    }

    getView() {
        this._element = this._getTemplate();
        this._image = this._element.querySelector('.card__image');
        this._title = this._element.querySelector('.card__title');


        this._image.src = this._data.link;
        this._image.alt = this._data.name; 
        this._title.textContent = this._data.name;

        this._setEventListeners();

        return this._element;
    }


_setEventListeners() {
    this._image.addEventListener('click', () => {
        this._handleImageClick(this._data);
      }); 
    
    this._element.querySelector('.card__like-button').addEventListener('click', () => {
        this._handleLikeIcon();
    })

    this._element.querySelector('.card__delete-button').addEventListener('click', () => {
        this._handleDeleteCard();
    });

}

_handleLikeIcon() {
    this._element.querySelector('.card__like-button').classList.toggle('card__like-button_active');
}

_handleDeleteCard() {
    this._element.remove();
    this._element = null;
}

}
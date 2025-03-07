export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._handleEscClose = this._handleEscClose.bind(this);
        this._handleClickClose = this._handleClickClose.bind(this);
    }

    open() {
        this._popupElement.classList.add('modal_opened');
        document.addEventListener('click', this._handleClickClose);
        document.addEventListener('keyup', this._handleEscClose);
    }

    close(){
        this._popupElement.classList.remove('modal_opened');
        document.removeEventListener('click', this._handleClickClose);
        document.removeEventListener('keyup', this._handleEscClose);
    }

    setEventListeners() {
        this._popupElement.querySelector('.modal__close').addEventListener('click', () => this.close());
    }

    _handleEscClose(evt) {
    if (evt.key === "Escape") {
        this.close();
    }
}

    _handleClickClose(evt) {
    if (evt.target === this._popupElement) {
        this.close();
    }
}
}
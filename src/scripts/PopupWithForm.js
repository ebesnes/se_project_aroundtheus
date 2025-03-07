import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector);
        this._formElement = this._popupElement.querySelector('.modal__form');
        this._inputElements = this._formElement.querySelectorAll('.modal__input');
        this._handleFormSubmit = handleFormSubmit;

    }

    _getInputValues(){
        const formData = {};
        this._inputElements.forEach(input => {
            formData[input.name] = input.value;
        });
        return formData;
    }

    open(){
        super.open();
    }

    close() {
        this._formElement.reset();
        super.close();
    }

    setEventListeners(){
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
            this.close();
        });
    }
}
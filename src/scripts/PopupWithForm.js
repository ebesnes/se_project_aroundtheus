import Popup from './Popup.js';

class PopupWithForm extends Popup {
    constructor(popupSelector, handelFormSubmit) {
        super({ popupSelector });
        this._popupForm = this._popupElement.querySelector('.popupform');
        this._handleFormSubmit = handelFormSubmit;

    }

    close() {
        this._popupForm.reset()
        super.close();
    }
}
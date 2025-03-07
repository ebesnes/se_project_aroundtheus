import Popup from './Popup';

export default class PopupWithImage extends Popup {
    constructor (popupSelector) {
        super(popupSelector);
        this._previewImage = this._popupElement.querySelector('.modal__preview-image');
        this._previewCardTitle = this._popupElement.querySelector('.modal__preview-title');

    }

    open({ link, name }){
        this._previewImage.src = link;
        this._previewImage.alt = `Image ${name}`;
        this._previewCardTitle.textContent = name;
        super.open();
    }
}
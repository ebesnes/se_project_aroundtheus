import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._previewImage = this._popupElement.querySelector(
      ".modal__preview-image"
    );
    this._previewCardTitle = this._popupElement.querySelector(
      ".modal__preview-title"
    );
  }

  open({ url, link, name }) {
    const imageLink = link || url;
    if (!imageLink) {
      console.error("PopupWithImage: missing image link", { url, link });
      return;
    }
    this._previewImage.src = imageLink;
    this._previewImage.alt = `Image ${name}`;
    this._previewCardTitle.textContent = name;
    super.open();
  }
}

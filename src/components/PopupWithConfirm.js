import Popup from "./Popup";

export default class PopupWithConfirm extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._form = this._popupElement.querySelector("#confirm-form");
    this._handleSubmit = this._handleSubmit.bind(this);
    this._form.addEventListener("submit", this._handleSubmit);
  }

  _handleSubmit(evt) {
    evt.preventDefault();
    if (this._callback) {
      this._callback();
    }
  }

  setEventListeners() {
    super.setEventListeners();
  }

  setSubmitAction(callback) {
    this._callback = callback;
  }
}

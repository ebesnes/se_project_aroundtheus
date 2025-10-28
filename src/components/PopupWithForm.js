import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._formElement = this._popupElement.querySelector(".modal__form");
    if (!this._formElement) {
      throw new Error(
        `Form element with class 'modal__form' not found in popup: ${popupSelector}`
      );
    }

    this._inputElements = this._formElement.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;
    this._submitButton = this._formElement.querySelector(".modal__button");
    this._defaultButtonText = this._submitButton.textContent;
  }

  _getInputValues() {
    const formData = {};
    this._inputElements.forEach((input) => {
      formData[input.name] = input.value;
    });
    return formData;
  }

  renderButtonLoad(isLoading) {
    isLoading
      ? (this._submitButton.textContent = "Saving...")
      : (this._submitButton.textContent = "Save");
  }

  close() {
    super.close();
    this.resetForm();
    this.renderButtonLoad(false);
  }

  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderButtonLoad(true);
      let submitResult;
      try {
        submitResult = this._handleFormSubmit(this._getInputValues());
      } catch (error) {
        this.renderButtonLoad(false);
        throw error;
      }
      Promise.resolve(submitResult).finally(() => {
        this.renderButtonLoad(false);
      });
    });
  }
}

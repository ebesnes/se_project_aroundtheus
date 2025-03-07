export default class FormValidator {
    constructor (config, formElement) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;

        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        this._submitButton = this._formElement.querySelector(this._submitButtonSelector);
    }

    _showInputError(inputElement) {
        const errorMessageEl = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorMessageEl.textContent = inputElement.validationMessage;
        errorMessageEl.classList.add(this._errorClass);
    }

    _hideInputError(inputElement) {
        const errorMessageEl = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorMessageEl.textContent = '';
        errorMessageEl.classList.remove(this._errorClass);
    }

    _checkInputValidity(inputElement) {
       inputElement.validity.valid ? this._hideInputError(inputElement) : this._showInputError(inputElement);
    }
    
    _toggleButtonState() {
        const hasInvalidInput = this._inputList.some((inputElement) => !inputElement.validity.valid);
        this._submitButton.classList.toggle(this._inactiveButtonClass, hasInvalidInput);
        this._submitButton.disabled = hasInvalidInput;
    }

    _setEventListeners() {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
    }

    enableValidation() {
        this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
        this._setEventListeners();
    }

    resetValidation() {
        this._inputList.forEach((inputElement) => this._hideInputError(inputElement));
        this._toggleButtonState();
    }

}
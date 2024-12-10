export default class FormValidator {
    constructor (config, formElement) {
        this._inputSelector = config.inputSelector;
        this._submitButtonSelector = config.submitButtonSelector;
        this._inactiveButtonClass = config.inactiveButtonClass;
        this._inputErrorClass = config.inputErrorClass;
        this._errorClass = config.errorClass;

        this._formElement = formElement;
    }

    _showInputError(inputElement){
        const errorMessageEl = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorMessageEl.textContent = inputElement.validationMessage;
        errorMessageEl.classList.add(this._errorClass);
    }

    _hideInputError(inputElement){
        const errorMessageEl = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorMessageEl.textContent = '';
        errorMessageEl.classList.remove(this._errorClass);
    }

    _checkInputValidity(inputElement) {
       if (!inputElement.validity.valid) {
                    this._showInputError(inputElement);
                } else {
                    this._hideInputError(inputElement);
                }
    }
    
    _toggleButtonState(inputList, submitButton) {
        const hasInvalidInput = inputList.some((inputElement) => !inputElement.validity.valid);
        if (hasInvalidInput) {
            submitButton.classList.add(this._inactiveButtonClass);
            submitButton.disabled = true;
        } else {
            submitButton.classList.remove(this._inactiveButtonClass);
            submitButton.disabled = false;
        }
    }


    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
        const submitButton = this._formElement.querySelector(this._submitButtonSelector);

        this._toggleButtonState(inputList, submitButton);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, submitButton);
            });
        });
    }

    enableValidation(){
        this._formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
        })

        this._setEventListeners();
    }

}
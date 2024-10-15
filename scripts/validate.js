function checkInputValidity(formEl, inputEl, choices) {
    if (!inputEl.validity.valid) {
            showInputError(formEl, inputEl, choices);
        } else {
            hideInputError(formEl, inputEl, choices);
        }
}

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = '';
    errorMessageEl.classList.remove(errorClass);
}

function hasInvalidInput(inputList){
    return !inputList.every((inputEl) => inputEl.validity.valid)
}

function disableSubmit(submitButton, { inactiveButtonClass }){
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
}

function enableSubmit(submitButton, { inactiveButtonClass }){
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
}

function toggleButtonState(inputEls, submitButton, { inactiveButtonClass }){
    if (hasInvalidInput(inputEls)){
        disableSubmit (submitButton, { inactiveButtonClass });
    } else {
        enableSubmit (submitButton, { inactiveButtonClass});
    }
}

function setEventListeners(formEl, choices) {
    const { inputSelector, submitButtonSelector } = choices;
    const inputEls = [...formEl.querySelectorAll(inputSelector)];
    const submitButton = formEl.querySelector(submitButtonSelector);

    inputEls.forEach((inputEl) => {
        inputEl.addEventListener('input', () => {
            checkInputValidity(formEl, inputEl, choices);
            toggleButtonState(inputEls, submitButton, choices);
        });
    });
}

function enableValidation(choices) {
    const formEls = [...document.querySelectorAll(choices.formSelector)]
    formEls.forEach((formEl) => {
        formEl.addEventListener("submit", (evt) => {
            evt.preventDefault();
        })

        setEventListeners(formEl, choices);

    });
  }

const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
};

enableValidation(config);
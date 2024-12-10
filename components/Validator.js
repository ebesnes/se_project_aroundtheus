// function checkInputValidity(formEl, inputElement, choices) {
//     if (!inputElement.validity.valid) {
//             showInputError(formEl, inputElement, choices);
//         } else {
//             hideInputError(formEl, inputElement, choices);
//         }
// }

// function showInputError(formEl, inputElement, { inputErrorClass, errorClass }) {
//     const errorMessageEl = formEl.querySelector(`#${inputElement.id}-error`);
//     inputElement.classList.add(inputErrorClass);
//     errorMessageEl.textContent = inputElement.validationMessage;
//     errorMessageEl.classList.add(errorClass);
// }

// function hideInputError(formEl, inputElement, { inputErrorClass, errorClass }) {
//     const errorMessageEl = formEl.querySelector(`#${inputElement.id}-error`);
//     inputElement.classList.remove(inputErrorClass);
//     errorMessageEl.textContent = '';
//     errorMessageEl.classList.remove(errorClass);
// }

// function hasInvalidInput(inputList){
//     return !inputList.every((inputElement) => inputElement.validity.valid)
// }

function disableSubmit(submitButton, { inactiveButtonClass }){
    submitButton.classList.add(inactiveButtonClass);
    submitButton.disabled = true;
}

function enableSubmit(submitButton, { inactiveButtonClass }){
    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
}

// function toggleButtonState(inputElements, submitButton, { inactiveButtonClass }){
//     if (hasInvalidInput(inputElements)){
//         disableSubmit (submitButton, { inactiveButtonClass });
//     } else {
//         enableSubmit (submitButton, { inactiveButtonClass});
//     }
// }

// function setEventListeners(formEl, choices) {
//     const { inputSelector, submitButtonSelector } = choices;
//     const inputElements = [...formEl.querySelectorAll(inputSelector)];
//     const submitButton = formEl.querySelector(submitButtonSelector);

//     inputElements.forEach((inputElement) => {
//         inputElement.addEventListener('input', () => {
//             checkInputValidity(formEl, inputElement, choices);
//             toggleButtonState(inputElements, submitButton, choices);
//         });
//     });
// }

// function enableValidation(choices) {
//     const formEls = [...document.querySelectorAll(choices.formSelector)]
//     formEls.forEach((formEl) => {
//         formEl.addEventListener("submit", (evt) => {
//             evt.preventDefault();
//         })

//         setEventListeners(formEl, choices);

//     });
//   }

const config = {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__button",
    inactiveButtonClass: "modal__button_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible"
};

enableValidation(config);
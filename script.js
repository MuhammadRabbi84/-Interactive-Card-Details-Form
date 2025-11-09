const cardNameInput = document.getElementById("cardholderName");
const cardNumInput = document.getElementById("cardNumber");
const expMonthInput = document.getElementById("month");
const expYearInput = document.getElementById("year");
const cvcNumInput = document.getElementById("cvcNumber");
const errors = document.querySelectorAll(".error-msg");

const validText = /^[A-Za-zঅ-হ\s]+$/;
const validNum = /^(?:[0-9০-৯]+)$/;

let isValid;

/* Check valid input */
function validInput (){
  
    isValid = true;

    const nameValue = cardNameInput.value.trim();
    const numberValue = cardNumInput.value.trim();
    const yearValue = expYearInput.value.trim();
    const monthValue = expMonthInput.value.trim();
    const cvcValue = cvcNumInput.value.trim()


    /* Card holder name check */
    if(nameValue === ""){
        cardNameInput.classList.add("show_error");
        isValid = false;

    } else if(!validText.test(nameValue)){
        cardNameInput.classList.add("show_error");
        errors[0].textContent = "Wrong format ,should be name";
        isValid = false;
    }

    /* Card number check */
    if(numberValue === ""){
        cardNumInput.classList.add("show_error");
        isValid = false;
    }
    else if (!validNum.test(numberValue)){
        cardNumInput.classList.add("show_error");
        errors[1].textContent = "Wrong format ,numbers only";
        isValid = false;
    } 
    else if(numberValue.length < 16){
        cardNumInput.classList.add("show_error");
        errors[1].textContent = "Must be 16 digits";
        isValid = false;
    }


    /* Exp date check */
    if(monthValue === "" || yearValue === ""){
        expMonthInput.classList.add("show_error");
        expYearInput.classList.add("show_error");
        isValid = false;
    }
    else if(!validNum.test(monthValue) || !validNum.test(yearValue)){
        expMonthInput.classList.add("show_error");
        expYearInput.classList.add("show_error");
        errors[2].textContent = "Wrong format";
        isValid = false;
    }
    else if(monthValue.length < 2 || yearValue.length < 2){
        expMonthInput.classList.add("show_error");
        expYearInput.classList.add("show_error");
        errors[2].textContent = "MM/YY must be 2 digits";
        isValid = false;
    }
    else if(monthValue > 12 || yearValue < 25 ){
        expMonthInput.classList.add("show_error");
        expYearInput.classList.add("show_error");
        errors[2].textContent = "Wrong format";
        isValid = false;
    }

    /* Card pin number check */
    if(cvcValue === ""){
        cvcNumInput.classList.add("show_error");
        isValid = false;
    }
    else if(!validNum.test(cvcValue)){
        cvcNumInput.classList.add("show_error");
        errors[3].textContent = "Wrong format";
        isValid = false;
    }
    else if(cvcValue.length < 3){
        cvcNumInput.classList.add("show_error");
        errors[3].textContent = "Must be 3 digits.";
        isValid = false;
    }
}


/* Submit form and update card info */
const form = document.getElementById("form");
const inputs = document.querySelectorAll(".form input");
const formSection  = document.querySelector(".form-section");
const continueBtn = document.getElementById("continueBtn");

form.addEventListener("submit",(e) => {
    e.preventDefault();
    validInput();

    if(isValid){
        formSection.classList.add("show-complete");
    }
})

continueBtn.addEventListener("click", () => {
    formSection.classList.remove("show-complete");
})

const cardNumber = document.getElementById("frontCardNum");
const cardName = document.getElementById("frontCardName");
const cardExpireMonth = document.getElementById("frontCardMonth");
const cardExpireYear = document.getElementById("frontCardYear");
const cardCvc = document.getElementById("backCardCvc");

inputs.forEach(input => {
    input.addEventListener("input", () => {

        if(validNum.test(expMonthInput.value.trim()) && validNum.test(expYearInput.value.trim()) 
        && expMonthInput.value >= 2 && expYearInput.value >=2 ) {

            expMonthInput.classList.remove("show_error");
            expYearInput.classList.remove("show_error");
        }
        
        input.classList.remove("show_error");
        
        cardName.textContent = cardNameInput.value || "JANE APPLESEED";
        cardNumber.textContent = cardNumInput.value.replace(/(\d{4})/g, "$1 ") || "0000 0000 0000 000";
        cardExpireYear.textContent = expYearInput.value || "00";
        cardExpireMonth.textContent = expMonthInput.value || "00";
        cardCvc.textContent = cvcNumInput.value || "000";
    })
})
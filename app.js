let divDisplay = document.querySelector("#display");
let divClear = document.querySelector("#clear");
let divDelete = document.querySelector("#delete");
let divEqual = document.querySelector("#equal");
let divDecimal = document.querySelector("#decimal");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const modeToggle = document.querySelector("#mode");

let firstValue = 0;
let secondValue = 0;
let resultValue = 0;
let operatorUsed = "";
let allowFlag = false;
let operatorAdded = false;
let bothValuesAdded = false;
let allowOperator = true;
let allowDecimal = true;

/*When number is clicked, displayNumber is triggered*/
numbers.forEach(e => {
    e.addEventListener("click", function (e) {
        displayNumber(this.textContent);
    });
});

/*When operator is clicked, displayOperator is triggered*/
operators.forEach(e => {
    e.addEventListener("click", function (e) {
        displayOperator(this.textContent);
    });
});

divDecimal.addEventListener("click", addDecimal);

divEqual.addEventListener("click", getValues);

divClear.addEventListener("click", clearAll);

divDelete.addEventListener("click", clearEntry);

modeToggle.addEventListener("click", changeMode);

/*Section for keyboard shortcuts, respective functions triggered when these keys are pressed*/
document.addEventListener("keydown", function (e) {
    let numbersArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let operatorsArray = ['^', '/', '*', '+', '-'];
    if (numbersArray.includes(e.key)) {
        displayNumber(e.key);
    }
    if (operatorsArray.includes(e.key)) {
        displayOperator(e.key);
    }
    if (e.key === '.') {
        addDecimal();
    }
    if (e.key === 'a' || e.key === 'c') {
        clearAll();
    }
    if (e.key === 'd' || e.key === 'Backspace' || e.key === 'Delete') {
        clearEntry();
    }
    if (e.key === '=' || e.key === 'Enter') {
        getValues();
    }
})

function displayNumber(value) {
    /*Clears display when NaN*/
    if (divDisplay.textContent == "NaN") {
        clearAll();
    }
    if (divDisplay.textContent.length < 15) {
        /*When display is 0, the first digit replaces it*/
        if (value == 0 && divDisplay.textContent === "0" && allowDecimal) {
            divDisplay.textContent = value;
        } else {
            /*After decimal has been entered*/
            if (!allowFlag && allowDecimal) {
                divDisplay.textContent = value;
                allowFlag = true;
            } else {
                /*Normal case when digit is added*/
                divDisplay.textContent += value;
                /*If number is added after entering operator, so that result can be calculated*/
                if (operatorAdded || (operatorAdded && !allowOperator)) {
                    bothValuesAdded = true;
                }
            }
        }
    }
}

function displayOperator(value) {
    /*To check if both values are added or not*/
    if (bothValuesAdded) {
        getValues();
    }
    if (allowOperator) {
        /*Allows only -ve sign to come after operator as a part of operations for negative numbers*/
        if (operatorAdded && value == "-") {
            divDisplay.textContent += value;
            allowOperator = false;
        } else if (!operatorAdded) {
            firstValue = parseFloat(divDisplay.textContent);
            divDisplay.textContent += value;
            allowFlag = true;
            allowDecimal = true;
            operatorAdded = true;
            operatorUsed = value;
        }
    }
}

/*Adds decimal to text only once*/
function addDecimal() {
    if (allowDecimal) {
        divDisplay.textContent += ".";
        allowDecimal = false;
    }
}

function getValues() {
    if (bothValuesAdded) {
        /*Finds position of operator from display string*/
        let indexOfOperator = divDisplay.textContent.indexOf(operatorUsed, firstValue.toString().length - 1);
        if (!allowOperator) {
            /*For negative numbers*/
            secondValue = parseFloat(divDisplay.textContent.substring(indexOfOperator + 2)) * -1;
        } else {
            /*For positive numbers*/
            secondValue = parseFloat(divDisplay.textContent.substring(indexOfOperator + 1));
        }
        calculateValues(firstValue, secondValue, operatorUsed);
    }
}

function add(a, b) {
    return (a + b);
}

function subtract(a, b) {
    return (a - b);
}

function multiply(a, b) {
    return (a * b);
}

function divide(a, b) {
    return ((b !== 0) ? (a / b) : "ERROR!");
}

function power(a, b) {
    return (Math.pow(a, b));
}

function calculateValues(first, second, op) {
    let result;
    switch (op) {
        case "+":
            result = add(first, second);
            break;
        case "-":
            result = subtract(first, second);
            break;
        case "*":
            result = multiply(first, second);
            break;
        case "/":
            result = divide(first, second);
            break;
        case "^":
            result = power(first, second);
            break;
        default:
            result = "INVALID";
    }
    resultValue = roundValue(result);
    displayResultValue(resultValue);
}

/*To round digits, when they have more than 4 decimal places*/
function roundValue(result) {
    let resultParts = result.toString().split(".");
    if (resultParts.length > 1 && resultParts[1].length > 5) {
        result = result.toFixed(4);
    }
    result = +result;
    /*If number is too big for display, this converts it into exponential notation*/
    if (result.toString().length > 12) {
        result = result.toExponential(5);
    }
    return result;
}

function displayResultValue(result) {
    if (result != NaN) {
        divDisplay.textContent = result;
        allowOperator = true;
        operatorAdded = false;
        allowDecimal = false;
        allowFlag = true;
        bothValuesAdded = false;
    } else {
        divDisplay.textContent = result;
        allowOperator = false;
        operatorAdded = true;
        allowDecimal = false;
        allowFlag = false;
        bothValuesAdded = false;
    }
}

function clearEntry() {
    /*If display doesn't contain anything it's left at 0*/
    if ((divDisplay.textContent == "0" && divDisplay.textContent.length == 1) || (divDisplay.textContent != "0" && divDisplay.textContent.length == 1)) {
        divDisplay.textContent = "0";
        allowFlag = false;
    } /*If last character is a digit, it is removed*/
    else if (divDisplay.textContent.substring(divDisplay.textContent.length - 1).match(/\d/) && !operatorAdded) {
        divDisplay.textContent = divDisplay.textContent.substring(0, divDisplay.textContent.length - 1);
    } /*If last character is a decimal point, it is removed*/
    else if (divDisplay.textContent.substring(divDisplay.textContent.length - 1).match(/[.]/)) {
        divDisplay.textContent = divDisplay.textContent.substring(0, divDisplay.textContent.length - 1);
        allowDecimal = true;
    } /*If last character is a negative sign for negative number*/
    else if (divDisplay.textContent.substring(divDisplay.textContent.length - 1).match(/[-]/) && !allowOperator) {
        divDisplay.textContent = divDisplay.textContent.substring(0, divDisplay.textContent.length - 1);
        if (operatorAdded && !allowOperator) {
            allowOperator = true;
            operatorAdded = false;
        }
    } /*If last character is an operator*/
    else if (divDisplay.textContent.substring(divDisplay.textContent.length - 1).match(/[-*+/^]/)) {
        divDisplay.textContent = divDisplay.textContent.substring(0, divDisplay.textContent.length - 1);
        if (operatorAdded) {
            operatorAdded = false;
        }
    } /*If last character is a digit and both values are present*/
    else if (divDisplay.textContent.substring(divDisplay.textContent.length - 1).match(/\d/) && operatorAdded) {
        divDisplay.textContent = divDisplay.textContent.substring(0, divDisplay.textContent.length - 1);
        if (divDisplay.textContent.substring(divDisplay.textContent.length - 1).match(/[-*+/^]/) && operatorAdded) {
            bothValuesAdded = false;
        }
    }
}

/*Clears everything on screen, all variables set to default*/
function clearAll() {
    divDisplay.textContent = "0";
    firstValue = 0;
    secondValue = 0;
    resultValue = 0;
    operatorUsed = "";
    allowFlag = false;
    operatorAdded = false;
    bothValuesAdded = false;
    allowOperator = true;
    allowDecimal = true;
}

/*To show help card*/
function helpOn() {
    document.querySelector("#help-card").style.display = "block";
}

/*To hide help card*/
function helpOff() {
    document.querySelector("#help-card").style.display = "none";
}

function changeMode() {
    if (modeToggle.textContent == "light_mode") {
        modeToggle.textContent = "dark_mode";
        document.querySelector(":root").style.setProperty('--base-color-2','hsla(0, 0%, 92%, 100%)');
        document.querySelector(":root").style.setProperty('--base-color-1','hsla(0, 0%, 15%, 100%)');
        document.querySelector(":root").style.setProperty('--base-color-5','hsla(40, 90%, 61%, 100%)');
        document.querySelector(":root").style.setProperty('--base-color-4','hsla(210, 63%, 43%, 100%)');
    } else if (modeToggle.textContent == "dark_mode") {
        modeToggle.textContent = "light_mode";
        document.querySelector(":root").style.setProperty('--base-color-1','hsla(0, 0%, 92%, 100%)');
        document.querySelector(":root").style.setProperty('--base-color-2','hsla(0, 0%, 15%, 100%)');
        document.querySelector(":root").style.setProperty('--base-color-4','hsla(40, 90%, 61%, 100%)');
        document.querySelector(":root").style.setProperty('--base-color-5','hsla(210, 63%, 43%, 100%)');
    }
}
let divDisplay = document.querySelector("#display");
let divClear = document.querySelector("#clear");
let divDelete = document.querySelector("#delete");
let divEqual = document.querySelector("#equal");
let divDecimal = document.querySelector("#decimal");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");

let firstValue = 0;
let secondValue = 0;
let operatorUsed = "";
let isOperatorAdded = false;
let isNumberAdded = true;
let zeroFlag = false;
let allowDecimal = true;

numbers.forEach(e => {
    e.addEventListener('click', displayNumber);
});

operators.forEach(e => {
    e.addEventListener('click', displayOperator);
});

divClear.addEventListener("click", clearAll);
divEqual.addEventListener("click", calculateResultValue);
divDecimal.addEventListener("click", addDecimal);

function displayNumber() {
    if (divDisplay.textContent.length < 12) {
        if (!isOperatorAdded) {
            if (divDisplay.textContent.match(/^(0)\1*/) && allowDecimal) {
                divDisplay.textContent = this.textContent;
            } else {
                divDisplay.textContent += this.textContent;
            }
        } else {
            if (divDisplay.textContent.match(/[-/+*]+[0]+/) && this.textContent == 0 && allowDecimal) {
                zeroFlag = true;
            } else if (divDisplay.textContent.match(/[-/+*]+[0]+/) && zeroFlag && this.textContent != 0 && allowDecimal) {
                divDisplay.textContent = divDisplay.textContent.substring(0, divDisplay.textContent.length - 1) + this.textContent;
            }
            else if (!(divDisplay.textContent.match(/^(0)\1{1,}/))) {
                divDisplay.textContent += this.textContent;
            }
            isNumberAdded = true;
        }
    }
}

function displayOperator() {
    if (!isOperatorAdded && isNumberAdded) {
        firstValue = parseFloat(divDisplay.textContent);
        operatorUsed = this.textContent;
        divDisplay.textContent += operatorUsed;
        isOperatorAdded = true;
        isNumberAdded = false;
        allowDecimal = true;
    }
    if (isOperatorAdded & isNumberAdded) {
        calculateResultValue();
        firstValue = parseFloat(divDisplay.textContent);
        operatorUsed = this.textContent;
        divDisplay.textContent += operatorUsed;
        isOperatorAdded = true;
        isNumberAdded = false;
        allowDecimal = true;
    }
}

function clearAll() {
    divDisplay.textContent = "0";
    firstValue = 0;
    secondValue = 0;
    operatorUsed = "";
    isOperatorAdded = false;
    isNumberAdded = true;
    zeroFlag = false;
    allowDecimal = true;
}

function calculateResultValue() {
    if (isOperatorAdded && isNumberAdded) {
        let resultValue;
        let indexOfOperator = divDisplay.textContent.indexOf(divDisplay.textContent.match(/[-/+*]+/));
        secondValue = parseFloat(divDisplay.textContent.slice(indexOfOperator + 1));
        resultValue = operate(operatorUsed, firstValue, secondValue);
        displayResultValue(resultValue);
    }
}

function displayResultValue(result) {
    divDisplay.textContent = result;
    isNumberAdded = true;
    isOperatorAdded = false;
    zeroFlag = false;
    allowDecimal = (divDisplay.textContent.indexOf('.') > -1) ? false : true;
}

function addDecimal() {
    if (allowDecimal) {
        divDisplay.textContent += ".";
        allowDecimal = false;
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

function operate(operator, a, b) {
    let result;
    switch (operator) {
        case "+":
            result = add(a, b);
            break;
        case "-":
            result = subtract(a, b);
            break;
        case "*":
            result = multiply(a, b);
            break;
        case "/":
            result = divide(a, b);
            break;
        default:
            result = "INVALID!";
    }
    let resultParts = result.toString().split(".");
    if (resultParts.length > 1) {
        if (resultParts[1].length > 5) {
            result = result.toFixed(4);
        }
    }
    result = +result;
    return result;
}
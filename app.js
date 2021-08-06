let divDisplay = document.querySelector("#display");
let divClear = document.querySelector("#clear");
let divDelete = document.querySelector("#delete");
let divEqual = document.querySelector("#equal");
let divDecimal = document.querySelector("#decimal");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");

let firstValue = 0;
let secondValue = 0;
let resultValue = 0;
let operatorUsed = "";
let allowFlag = false;
let operatorAdded = false;
let bothValuesAdded = false;
let allowOperator = true;
let allowDecimal = true;

numbers.forEach(e => {
    e.addEventListener('click', displayNumber);
});

operators.forEach(e => {
    e.addEventListener('click', displayOperator);
});

divDecimal.addEventListener("click", addDecimal);

divEqual.addEventListener("click", getValues);

divClear.addEventListener("click", clearAll);

function displayNumber() {
    if (divDisplay.textContent.length < 15) {
        if (this.textContent == 0 && divDisplay.textContent === "0" && allowDecimal) {
            divDisplay.textContent = this.textContent;
        } else {
            if (!allowFlag && allowDecimal) {
                divDisplay.textContent = this.textContent;
                allowFlag = true;
            } else {
                divDisplay.textContent += this.textContent;
                if (operatorAdded || (operatorAdded && !allowOperator)) {
                    bothValuesAdded = true;
                }
            }
        }
    }
}

function displayOperator() {
    if (bothValuesAdded) {
        getValues();
    }
    if (allowOperator) {
        if (operatorAdded && this.textContent == "-") {
            divDisplay.textContent += this.textContent;
            allowOperator = false;
        } else if (!operatorAdded) {
            firstValue = parseFloat(divDisplay.textContent);
            divDisplay.textContent += this.textContent;
            allowFlag = true;
            allowDecimal = true;
            operatorAdded = true;
            operatorUsed = this.textContent;
        }
    }
}

function addDecimal() {
    if (allowDecimal) {
        divDisplay.textContent += this.textContent;
        allowDecimal = false;
    }
}

function getValues() {
    if (bothValuesAdded) {
        let indexOfOperator = divDisplay.textContent.indexOf(operatorUsed);
        if (!allowOperator) {
            secondValue = parseFloat(divDisplay.textContent.substring(indexOfOperator + 2)) * -1;
        } else {
            secondValue = parseFloat(divDisplay.textContent.substring(indexOfOperator + 1));
        }
        console.log(`a: ${firstValue}, b: ${secondValue}, op: ${operatorUsed}`);
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
        default:
            result = "INVALID";
    }
    resultValue = roundValue(result);
    displayResultValue(resultValue);
}

function roundValue(result) {
    let resultParts = result.toString().split(".");
    if (resultParts.length > 1 && resultParts[1].length > 5) {
        result = result.toFixed(4);
    }
    result = +result;
    return result;
}

function displayResultValue(result) {
    divDisplay.textContent = result;
    allowOperator = true;
    operatorAdded = false;
    allowDecimal = false;
    allowFlag = true;
    bothValuesAdded = false;
}

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
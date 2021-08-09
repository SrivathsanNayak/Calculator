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
    e.addEventListener("click", displayNumber);
});

document.addEventListener("keydown", function (e) {
    if (e.key === 1) {
        displayNumber(1);
    }
});

operators.forEach(e => {
    e.addEventListener("click", displayOperator);
});

divDecimal.addEventListener("click", addDecimal);

divEqual.addEventListener("click", getValues);

divClear.addEventListener("click", clearAll);

divDelete.addEventListener("click", clearEntry);

function displayNumber(n) {
    let value = (n === null)? n : this.textContent;
    if (divDisplay.textContent == "NaN") {
        clearAll();
    }
    if (divDisplay.textContent.length < 15) {
        if ((value == 0) && divDisplay.textContent === "0" && allowDecimal) {
            divDisplay.textContent = value;
        } else {
            if (!allowFlag && allowDecimal) {
                divDisplay.textContent = value;
                allowFlag = true;
            } else {
                divDisplay.textContent += value;
                if (operatorAdded || (operatorAdded && !allowOperator)) {
                    bothValuesAdded = true;
                }
            }
        }
    }
}

function displayOperator(n) {
    let value = (n === undefined)? n : this.textContent;
    if (bothValuesAdded) {
        getValues();
    }
    if (allowOperator) {
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

function addDecimal(n) {
    let value = (n === undefined)? n : this.textContent;
    if (allowDecimal) {
        divDisplay.textContent += value;
        allowDecimal = false;
    }
}

function getValues() {
    if (bothValuesAdded) {
        let indexOfOperator = divDisplay.textContent.indexOf(operatorUsed, firstValue.toString().length - 1);
        if (!allowOperator) {
            secondValue = parseFloat(divDisplay.textContent.substring(indexOfOperator + 2)) * -1;
        } else {
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

function power(a,b) {
    return (Math.pow(a,b));
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

function roundValue(result) {
    let resultParts = result.toString().split(".");
    if (resultParts.length > 1 && resultParts[1].length > 5) {
        result = result.toFixed(4);
    }
    result = +result;
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
    if ((divDisplay.textContent == "0" && divDisplay.textContent.length == 1) || (divDisplay.textContent != "0" && divDisplay.textContent.length == 1)) {
        divDisplay.textContent = "0";
        allowFlag = false;
    } else if (divDisplay.textContent.substring(divDisplay.textContent.length - 1).match(/\d/) && !operatorAdded) {
        divDisplay.textContent = divDisplay.textContent.substring(0, divDisplay.textContent.length - 1);
    } else if (divDisplay.textContent.substring(divDisplay.textContent.length - 1).match(/[.]/)) {
        divDisplay.textContent = divDisplay.textContent.substring(0, divDisplay.textContent.length - 1);
        allowDecimal = true;
    } else if (divDisplay.textContent.substring(divDisplay.textContent.length - 1).match(/[-]/) && !allowOperator) {
        divDisplay.textContent = divDisplay.textContent.substring(0, divDisplay.textContent.length - 1);
        if (operatorAdded && !allowOperator) {
            allowOperator = true;
            operatorAdded = false;
        }
    } else if (divDisplay.textContent.substring(divDisplay.textContent.length - 1).match(/[-*+/^]/)) {
        divDisplay.textContent = divDisplay.textContent.substring(0, divDisplay.textContent.length - 1);
        if (operatorAdded) {
            operatorAdded = false;
        }
    } else if (divDisplay.textContent.substring(divDisplay.textContent.length - 1).match(/\d/) && operatorAdded) {
        divDisplay.textContent = divDisplay.textContent.substring(0, divDisplay.textContent.length - 1);
        if (divDisplay.textContent.substring(divDisplay.textContent.length - 1).match(/[-*+/^]/) && operatorAdded) {
            bothValuesAdded = false;
        }
    }
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
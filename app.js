let divDisplay = document.querySelector("#display");
let divClear = document.querySelector("#clear");
let divDelete = document.querySelector("#delete");
let divEqual = document.querySelector("#equal");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");

let firstValue = 0;
let secondValue = 0;
let operatorUsed = "";
let isOperatorAdded = false;
let isNumberAdded = true;
let zeroFlag = false;

numbers.forEach(e => {
    e.addEventListener('click', displayNumber);
});

operators.forEach(e => {
    e.addEventListener('click', displayOperator);
});

divClear.addEventListener("click", clearAll);
divEqual.addEventListener("click", calculateResultValue);

function displayNumber() {
    if (divDisplay.textContent.length < 12) {
        if (!isOperatorAdded) {
            if (divDisplay.textContent.match(/^(0)\1*/)) {
                divDisplay.textContent = this.textContent;
            } else {
                divDisplay.textContent += this.textContent;
            }
        } else {
            if (divDisplay.textContent.match(/[-/+*]+[0]+/) && this.textContent == 0) {
                zeroFlag = true;
            } else if (divDisplay.textContent.match(/[-/+*]+[0]+/) && zeroFlag && this.textContent != 0) {
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
        firstValue = parseInt(divDisplay.textContent);
        operatorUsed = this.textContent;
        divDisplay.textContent += operatorUsed;
        isOperatorAdded = true;
        isNumberAdded = false;
    }
}

function clearAll() {
    divDisplay.textContent = "0";
    firstValue = 0;
    operatorUsed = "";
    isOperatorAdded = false;
    isNumberAdded = true;
}

function calculateResultValue() {
    if (isOperatorAdded && isNumberAdded) {
        let indexOfOperator = divDisplay.textContent.indexOf(divDisplay.textContent.match(/[-/+*]+/));
        secondValue = parseInt(divDisplay.textContent.slice(indexOfOperator + 1));
        console.log(`${firstValue}, ${secondValue}, ${operatorUsed}`);
        operate(operatorUsed, firstValue, secondValue);
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
    switch (operator) {
        case "+":
            console.log(add(a, b));
            break;
        case "-":
            console.log(subtract(a, b));
            break;
        case "*":
            console.log(multiply(a, b));
            break;
        case "/":
            console.log(divide(a, b));
            break;
        default:
            console.log("Invalid!");
    }
}
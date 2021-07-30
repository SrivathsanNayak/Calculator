let divDisplay = document.querySelector("#display");
let divClear = document.querySelector("#clear");
let divDelete = document.querySelector("#delete");
let divEqual = document.querySelector("#equal");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");

let firstValue = 0;
let operatorUsed = "";
let isOperatorAdded = false;
let isNumberAdded = true;

numbers.forEach(e => {
    e.addEventListener('click', displayNumber);
});

operators.forEach(e => {
    e.addEventListener('click', displayOperator);
});

divClear.addEventListener("click", () => {
    divDisplay.textContent = "0";
    firstValue = 0;
    operatorUsed = "";
    isOperatorAdded = false;
    isNumberAdded = true;
});

function displayNumber() {
    if (divDisplay.textContent.length < 12) {
        if (!isOperatorAdded) {
            if (divDisplay.textContent.match(/^(0)\1*/)) {
                divDisplay.textContent = this.textContent;
            } else {
                divDisplay.textContent += this.textContent;
            }
        } else {
            if (divDisplay.textContent.match(/^(0)\1{1,}/)) {
                divDisplay.textContent = this.textContent;
            } else {
                divDisplay.textContent += this.textContent;
                isNumberAdded = true;
            }
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

/*
let displayValue = 0;
let firstValue = 0;
let operatorUsed = "";
let secondValue = 0;
let resultValue = 0;
let operatorAdded = false;

numbers.forEach(num => num.addEventListener("click", () => {
    if (divDisplay.textContent.length < 12) {
        if (!operatorAdded) {
            if (divDisplay.textContent.match(/^(0)\1*<insert forwardslash>)) {
                divDisplay.textContent = num.textContent;
            }
            else {
                divDisplay.textContent += num.textContent;
            }
        } else {
            if (divDisplay.textContent.match(/^(0)\1*<insert forwardslash>)) {
                divDisplay.textContent = num.textContent;
            }
            else {
                divDisplay.textContent += num.textContent;
            }
        }
    }
    displayValue = parseInt(divDisplay.textContent);
    //console.log(`${displayValue}: ${typeof(displayValue)}`);
}));

operators.forEach(operator => operator.addEventListener("click", () => {
    if (!operatorAdded) {
        firstValue = displayValue;
        operatorUsed = operator.textContent;
        operatorAdded = true;
        console.log(`Display value: ${displayValue}, Operator: ${operatorUsed}, First value: ${firstValue}`);
        divDisplay.textContent = "0";
    } else {
        secondValue = displayValue;
        console.log(`Display value: ${displayValue}, Operator: ${operatorUsed}, Second value: ${secondValue}`);
        operate(operatorUsed, firstValue, secondValue);
    }
}));

divClear.addEventListener("click", () => {
    divDisplay.textContent = "0";
    displayValue = 0;
});
*/

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
let divDisplay = document.querySelector("#display");
let divClear = document.querySelector("#clear");
let divDelete = document.querySelector("#delete");
let displayValue;

document.querySelectorAll(".numbers").forEach(num => 
    num.addEventListener("click", () => {
        if (divDisplay.textContent.length < 12) {
            if (divDisplay.textContent.match(/^(0)\1*/)) {
                divDisplay.textContent = num.textContent;
            }
            else {
                divDisplay.textContent += num.textContent;
            }
        }
        displayValue = parseInt(divDisplay.textContent);
        //console.log(`${displayValue}: ${typeof(displayValue)}`);
}));

divClear.addEventListener("click", () => {
    divDisplay.textContent = "0";
    displayValue = 0;
    //console.log(`${displayValue}: ${typeof(displayValue)}`);
});

function add(a,b) {
    return (a+b);
}

function subtract(a,b) {
    return (a-b);
}

function multiply(a,b) {
    return (a*b);
}

function divide(a,b) {
    return ((b !== 0) ? (a/b) : "ERROR!");
}

function operate(operator,a,b) {
    switch(operator) {
        case "+":
            console.log(add(a,b));
            break;
        case "-":
            console.log(subtract(a,b));
            break;
        case "*":
            console.log(multiply(a,b));
            break;
        case "/":
            console.log(divide(a,b));
            break;
        default:
            console.log("Invalid!");
    }
}
const divZero = document.querySelector("#zero");
const divOne = document.querySelector("#one");
const divTwo = document.querySelector("#two");
const divThree = document.querySelector("#three");
const divFour = document.querySelector("#four");
const divFive = document.querySelector("#five");
const divSix = document.querySelector("#six");
const divSeven = document.querySelector("#seven");
const divEight = document.querySelector("#eight");
const divNine = document.querySelector("#nine");

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

/*
operate("+",2,3);
operate("-",3,4);
operate("*",9.5,7);
operate("/",4,99);
*/
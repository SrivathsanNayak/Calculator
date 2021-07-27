function add(a, b) {
    return (a+b);
}

function subtract(a, b) {
    return (a-b);
}

function multiply(a, b) {
    return (a*b);
}

function divide(a, b) {
    return ((b !== 0) ? (a/b) : "ERROR!");
}

console.log(add(4,5));
console.log(subtract(80.3,3));
console.log(multiply(3.5,0));
console.log(divide(100,13));
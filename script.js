function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
} 

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(op, num1, num2) {
    if (op == "+") {
        return add(num1, num2);
    }
    else if (op == "-") {
        return subtract(num1, num2);
    }
    else if (op == "*") {
        return multiply(num1, num2);
    }
    else if (op == "/") {
        return divide(num1, num2);
    }
}

function populateDisplay(button) {
    let digit = Number(button.textContent);
    let s = document.createElement("span");
    s.textContent = digit;
    display.appendChild(s);
}

function getDisplayValue() {
    let displayValue = display.textContent;
    displayValue = Array.from(displayValue);
    displayValue.splice(0, 14);
    displayValue = combineArrayNums(displayValue);
    displayValue = Number(displayValue);
    return displayValue;
}

function combineArrayNums(arr) {
    let value = ""; 
    arr.forEach((val) => {
        value += val;
        return value;
    });
    arr = value;
    return arr;
}

const numButtons = document.querySelectorAll(".number-button");
const display = document.querySelector(".display");

numButtons.forEach((button) => {
    button.addEventListener("click", () => {
        populateDisplay(button);
    });
});
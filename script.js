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
    let digit = button.textContent;
    let s = document.createElement("span");
    s.textContent = digit;
    display.appendChild(s);
}

function getDisplayValue() {
    let displayValue = display.textContent;
    return displayValue;
}

const numButtons = document.querySelectorAll(".number-button");
const display = document.querySelector(".display");

numButtons.forEach((button) => {
    button.addEventListener("click", () => {
        populateDisplay(button);
    });
});
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

// Operate on 2 numbers based on operation chosen.
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

// Append digits into display when clicked, then save new display
// value variable.
function populateDisplay(button) {
    let digit = button.textContent;
    let s = document.createElement("span");
    s.textContent = digit;
    display.appendChild(s);
    let displayValue = getDisplayValue();
    return displayValue;
}

// Get the display value number to be saved as a variable for later use
function getDisplayValue() {
    let displayValue = display.textContent;
    displayValue = Array.from(displayValue);
    displayValue.splice(0, 14);
    displayValue = combineArrayNums(displayValue);
    displayValue = Number(displayValue);
    return displayValue;
}

// Combine the elements of an array in one number (to be used in 
// getDisplayValue function).
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
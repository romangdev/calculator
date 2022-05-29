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
    // let displayValue = getDisplayValue();
    // return displayValue;
}

// Get the display value number to be saved as a variable for later use
function getDisplayValue() {
    let displayValue = display.textContent;
    displayValue = Array.from(displayValue);
    for (let i = 0; i < displayValue.length; i++) {
        if (displayValue[i] === "\n" || displayValue[i] === " ") {
            displayValue.splice(i, 1);
        }
    }
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

const numButtons = document.querySelectorAll(".number-buttons button");
const opButtons = document.querySelectorAll(".operation-buttons button");
const display = document.querySelector(".display");

let operator = null;
let displayValue = null;

// When button clicked, if display showing an operator, then remove it
// Then populate the display with user input
numButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (display.textContent === "+" ||
        display.textContent === "-" ||
        display.textContent === "*" ||
        display.textContent === "/") {
            display.textContent = "";
        }
        populateDisplay(button);
    });
});

// When operator button is clicked, save which operator was chosen...
// get the value number value that's being displayed, and then display
// the chosen operator.
opButtons.forEach((button) => {
    button.addEventListener("click", () => {
        operator = button.textContent;
        displayValue = getDisplayValue();
        display.textContent = `${operator}`;
    });
});
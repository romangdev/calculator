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
}

function addDecimal(button) {
    let decimal = button.textContent;
    let s = document.createElement("span");
    s.textContent = decimal;
    display.appendChild(s);
    decimalAdded = true;
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

function checkZeroDivide(op, value) {
    if (formerOperator === "/" && getDisplayValue() === 0) {
        display.textContent = "Are you trying to crash the calculator?!";
        displayValue = null;
        operator = null;
        return true;
    }
}

function resetDisplayConditionally() {
    if (display.textContent === "0") {
        display.textContent = "";
    }
    else if (display.textContent === "Are you trying to crash the calculator?!") {
        display.textContent = "";
    }
    if (displayValue != null && operator) {
        display.textContent = "";
        operator = null;
    }
    if (clickedEquals === true) {
        display.textContent = "";
        clickedEquals = false;
    }
}

const numButtons = document.querySelectorAll(".number-buttons button");
const opButtons = document.querySelectorAll(".operation-buttons button");
const equalsbutton = document.querySelector(".equals-button");
const clearButton = document.querySelector(".clear-button");
const decimalButton = document.querySelector(".decimal-button");
const display = document.querySelector(".display");

let operator = null;
let displayValue = null;
let clickedEquals = false;

// When number button is clicked, populate the display and reset
// operator.
numButtons.forEach((button) => {
    button.addEventListener("click", () => {
        resetDisplayConditionally();
        populateDisplay(button);
    });
});

// When operator button is clicked, save operator selected and get
// the new display value.
opButtons.forEach((button) => {
    button.addEventListener("click", () => {
        operator = button.textContent;
        if (decimalAdded === true) {
            decimalAdded = false;
        }
        if (displayValue !== null) {
            if (checkZeroDivide(formerOperator, getDisplayValue)) {
                return;
            }
            let result = operate(formerOperator, displayValue, getDisplayValue());
            display.textContent = `${result}`;
        }
        formerOperator = operator;
        displayValue = getDisplayValue();
    });
});

// When equals button is clicked, operate on the user input numbers
equalsbutton.addEventListener("click", () => {
    if (clickedEquals === false) {
        if (decimalAdded === true) {
            decimalAdded = false;
        }
        if (checkZeroDivide(formerOperator, getDisplayValue)) {
            return;
        }
        let result = operate(formerOperator, displayValue, getDisplayValue());
        display.textContent = `${Number((result).toFixed(4))}`;
        displayValue = null;
        clickedEquals = true;
    }
});

// When clear is hit, reset calculator variables and clear display
clearButton.addEventListener("click", () => {
    displayValue = null;
    operator = null;
    display.textContent = "0";
});

let decimalAdded = false;
decimalButton.addEventListener("click", () => {
    resetDisplayConditionally();
    if (decimalAdded === false) {
        addDecimal(decimalButton);
    }
});
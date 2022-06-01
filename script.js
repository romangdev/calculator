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
    if (num1 === null) {
        return num2;
    }
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

// Handle the various scenarios that may come up during an operation on the
// calculator.
function handleOperationScenarios(button) {
    operator = button.textContent;
    if (decimalAdded === true) {
        decimalAdded = false;
    }
    if (operator === "-" && (display.textContent === "0" || display.textContent === "")) {
        clickedEquals = false;
        display.textContent = "-";
        return;
    }
    if (displayValue !== null) {
        if (checkZeroDivide(formerOperator, getDisplayValue)) {
            return;
        }
        let result = operate(formerOperator, displayValue, getDisplayValue());
        handleResultLength(result);
    }
    formerOperator = operator;
    displayValue = getDisplayValue();
}

// Append digits into display when clicked, then save new display
// value variable.
function populateDisplay(button) {
    if (limitReached === true) {
        return;
    }
    let s = document.createElement("span");
    s.textContent = button.textContent;
    display.appendChild(s);
    return latestCharacter = s;
}

// add a decimal onto the display when button is clicked
function addDecimal(button) {
    let decimal = button.textContent;
    let s = document.createElement("span");
    s.textContent = decimal;
    display.appendChild(s);
    decimalAdded = true;
    return latestCharacter = s;
}

// Get the display value number to be saved as a variable for later use
function getDisplayValue() {
    let displayValue = display.textContent;
    displayValue = Number(displayValue);
    return displayValue;
}

// See if there was a division by zero and handle with an error message
function checkZeroDivide(op, value) {
    if (formerOperator === "/" && getDisplayValue() === 0) {
        display.textContent = "Impossible!";
        displayValue = null;
        operator = null;
        return true;
    }
}

// Reset the display completely based on certain conditions being met
function resetDisplayConditionally() {
    if (display.textContent === "0") {
        display.textContent = "";
    }
    else if (display.textContent === "Impossible!") {
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

// highlight the border of each button yellow momentarily when clicked
function highlightBorder(button) {
    button.classList.remove("fade");
    button.classList.add("button-border");
    setTimeout(() => {
        button.classList.remove("button-border");
        button.classList.add("fade");
    }, 300);
};

// reset all variables whenever clear button is clicked
function clearReset() {
    displayValue = null;
    formerOperator = null;
    operator = null;
    display.textContent = "0";
}

// handle the equals button being pressed under various scenarios
function handleEqualsScenarios() {
    if (clickedEquals === false) {
        if (decimalAdded === true) {
            decimalAdded = false;
        }
        if (checkZeroDivide(formerOperator, getDisplayValue)) {
            return;
        }
        let result = operate(formerOperator, displayValue, getDisplayValue());
        handleResultLength(result);
        displayValue = null;
        clickedEquals = true;
    }
}

function handleResultLength(result) {
    result = Number((result).toFixed(4));
    let resultHolder = result;
    result = result.toString().split("");
    contains = result.find((element) => {
        if(element === "e") {
            return true;
        }
    }); 
    if (contains === "e") {
        for (let i = 0; i < result.length; i++) {
            if (result[i] === "e") {
                let range = i - 11;
                result.splice(11, range);
                display.textContent = `${result.join("")}`;
            }
        }
    }
    else {
        result.join("")
        display.textContent = `${Number((resultHolder).toFixed(4))}`;
    }
}

// make the display an array of elements to be used in limiting its length
function makeNumArray() {
    val = getDisplayValue();
    val = val.toString().split("");
    val.push("limit");
    return val;
}

// don't allow calculator result to display a number past the length of the display
function limitLength() {
    if (display.textContent === "" || display.textContent === "0") {
        limitReached = false;
    }
    val = makeNumArray();
    if (val.length === 17 || val.length === 18) {
        limitReached = true;
        return;
    }
}

const allButtons = document.querySelectorAll("button");
const numButtons = document.querySelectorAll(".number-buttons button");
const opButtons = document.querySelectorAll(".operation-buttons button");
const equalsButton = document.querySelector(".equals-button");
const clearButton = document.querySelector(".clear-button");
const decimalButton = document.querySelector(".decimal-button");
const backspaceButton = document.querySelector(".backspace-button");
const display = document.querySelector(".display");

let operator = null;
let displayValue = null;
let clickedEquals = false;
let latestCharacter = null;
let val = null;
let decimalAdded = false;
let limitReached = false;
let contains = null;

allButtons.forEach((button) => {
    button.classList.add("fade");
    button.addEventListener("click", () => {
        highlightBorder(button);
    });
});

// When number button is clicked, populate the display and reset
// operator. Handle the length limiting.
numButtons.forEach((button) => {
    button.addEventListener("click", () => {
        resetDisplayConditionally();
        limitLength();
        populateDisplay(button);
    });
});

// When operator button is clicked, save operator selected and get
// the new display value.
opButtons.forEach((button) => {
    button.addEventListener("click", () => {
        handleOperationScenarios(button);
    });
});

equalsButton.addEventListener("click", () => {
    handleEqualsScenarios();
});

clearButton.addEventListener("click", () => {
    clearReset();
});

decimalButton.addEventListener("click", () => {
    resetDisplayConditionally();
    if (decimalAdded === false) {
        addDecimal(decimalButton);
    }
});

backspaceButton.addEventListener("click", () => {
    display.removeChild(latestCharacter);
});

// Bind corresponding keyboard buttons to call same functions as their
// related buttons whenever clicked. (keyboard support)
document.addEventListener("keypress", (e) => {
    numButtons.forEach((button) => {
        if (e.key === button.textContent) {
            highlightBorder(button);
            resetDisplayConditionally();
            limitLength();
            populateDisplay(button);
        }
    });
    opButtons.forEach((button) => {
        if (e.key === button.textContent) {
            highlightBorder(button);
            handleOperationScenarios(button);
        }
    });
    if (e.key === "c") {
        highlightBorder(clearButton);
        clearReset();
    }
    else if (e.key === ".") {
        highlightBorder(decimalButton);
        resetDisplayConditionally();
        if (decimalAdded === false) {
            addDecimal(decimalButton);
        }
    }
    else if (e.key === "d") {
        highlightBorder(backspaceButton);
        display.removeChild(latestCharacter);
    }
    else if (e.key === "=" || e.key === "Enter") {
        highlightBorder(equalsButton);
        handleEqualsScenarios();
    }
});
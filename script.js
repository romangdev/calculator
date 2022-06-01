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
        display.textContent = `${result}`;
    }
    formerOperator = operator;
    displayValue = getDisplayValue();
}

// Append digits into display when clicked, then save new display
// value variable.
let latestCharacter = null;
function populateDisplay(button) {
    let s = document.createElement("span");
    s.textContent = button.textContent;
    display.appendChild(s);
    return latestCharacter = s;
}

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

function checkZeroDivide(op, value) {
    if (formerOperator === "/" && getDisplayValue() === 0) {
        display.textContent = "Impossible!";
        displayValue = null;
        operator = null;
        return true;
    }
}

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

function highlightBorder(button) {
    button.classList.remove("fade");
    button.classList.add("button-border");
    setTimeout(() => {
        button.classList.remove("button-border");
        button.classList.add("fade");
    }, 300);
};

function clearReset() {
    displayValue = null;
    formerOperator = null;
    operator = null;
    display.textContent = "0";
}

function handleEqualsScenarios() {
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
}

function makeNumArray() {
    val = getDisplayValue();
    val = val.toString().split("");
    val.push("limit");
    return val;
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
let val = null;

allButtons.forEach((button) => {
    button.classList.add("fade");
    button.addEventListener("click", () => {
        highlightBorder(button);
    });
});

// When number button is clicked, populate the display and reset
// operator.
let limitReached = false;
numButtons.forEach((button) => {
    button.addEventListener("click", () => {
        resetDisplayConditionally();
        if (display.textContent === "" || display.textContent === "0") {
            limitReached = false;
        }
        makeNumArray();
        if (val.length === 17) {
            limitReached = true;
            return;
        }
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

// When equals button is clicked, operate on the user input numbers
equalsButton.addEventListener("click", () => {
    handleEqualsScenarios();
});

// When clear is hit, reset calculator variables and clear display
clearButton.addEventListener("click", () => {
    clearReset();
});

let decimalAdded = false;
decimalButton.addEventListener("click", () => {
    resetDisplayConditionally();
    if (decimalAdded === false) {
        addDecimal(decimalButton);
    }
});

backspaceButton.addEventListener("click", () => {
    display.removeChild(latestCharacter);
});

document.addEventListener("keypress", (e) => {
    numButtons.forEach((button) => {
        if (e.key === button.textContent) {
            highlightBorder(button);
            resetDisplayConditionally();
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
    else if (e.key === "=") {
        highlightBorder(equalsButton);
        handleEqualsScenarios();
    }
});
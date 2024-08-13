let displayValue = ''; // Stores the current value displayed
let firstNumber = null; // Stores the first number entered
let secondNumber = null; // Stores the second number entered
let currentOperator = null; // Stores the selected operator

function appendNumber(number) {
    displayValue += number; // Append the clicked number to the displayValue
    document.getElementById('display').value = displayValue; // Update the display with the new value
}

function appendDecimal() {
    if (!displayValue.includes('.')) { // Ensure there's no existing decimal point
        displayValue += '.'; // Append the decimal point
        document.getElementById('display').value = displayValue; // Update the display
    }
}

function setOperator(operator) {
    if (displayValue === '') return; // Do nothing if display is empty
    firstNumber = parseFloat(displayValue); // Store the first number
    currentOperator = operator; // Store the selected operator
    displayValue = ''; // Clear the display for the next number
}

function calculateResult() {
    if (firstNumber === null || currentOperator === null || displayValue === '') return; // Ensure everything is in place

    secondNumber = parseFloat(displayValue); // Store the second number

    let result;
    switch (currentOperator) {
        case '+':
            result = firstNumber + secondNumber;
            break;
        case '-':
            result = firstNumber - secondNumber;
            break;
        case '*':
            result = firstNumber * secondNumber;
            break;
        case '/':
            if (secondNumber === 0) {
                result = "Error: can't divide by zero";
            } else {
                result = firstNumber / secondNumber;
            }
            break;
        default:
            result = "Error";
            break;
    }

    document.getElementById('display').value = result; // Display the result
    displayValue = result.toString(); // Update displayValue to the result for further operations
    firstNumber = null; // Reset the first number
    currentOperator = null; // Reset the operator
}

function clearDisplay() {
    displayValue = ''; // Clear the displayValue
    firstNumber = null; // Reset the first number
    secondNumber = null; // Reset the second number
    currentOperator = null; // Reset the operator
    document.getElementById('display').value = ''; // Clear the display
}


function backspace() {
    displayValue = displayValue.slice(0, -1); // Remove the last character from the displayValue
    document.getElementById('display').value = displayValue; // Update the display
}

// adding the keyboard support for the user to be
// user-friendly by allowing users to use their keyboard to input numbers, operators, and perform calculations

document.addEventListener('keyword', handleKeyboardInput);

function handleKeyboardInput(event){
    const key = event.key;

    if (isNumberKey(key)) {
        appendNumber(key);

    } else if (key === '.'){
        appendDecimal();

    } else if (isOperationKey(key)){
        setOperator(key);

    } else if (key === 'Enter' || key === '='){
        event.preventDefault(); // Prevent the default action of submitting forms
        calculateResult();

    } else if (key === 'Backspace'){
        backspace();

    } else if (key === 'Escape'){
        clearDisplay();
    }


    function isNumberKey(key){
        return isNaN(key); // Check if the key is a number
    }

    function isOperationKey(key){
        return ['+', '-', '*', '/'].includes(key); // Check if the key is one of the operators
    }
}
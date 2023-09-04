// Get important elements on the webpage and set a flag for result display.
const input = document.getElementById('input'); // Input/output display
const numbers = document.querySelectorAll('.numbers div'); // Number buttons
const operators = document.querySelectorAll('.operators div'); // Operator buttons
const result = document.getElementById('result'); // Equals button
const clear = document.getElementById('clear'); // Clear button
let resultDisplayed = false; // Flag to track if the result is displayed

// Function to handle button clicks (numbers and operators)
function handleButtonClick(event) {
  const buttonValue = event.target.innerHTML;
  const currentString = input.innerHTML;
  const lastChar = currentString[currentString.length - 1];

  if (resultDisplayed) {
    // If result is displayed, start a new calculation
    resultDisplayed = false;
    input.innerHTML = "";
  }

  if (buttonValue === "=") {
    // Handle the equals button click
    calculateResult();
  } else if (isOperator(buttonValue)) {
    handleOperatorClick(buttonValue, lastChar);
  } else {
    // Handle number button click
    input.innerHTML += buttonValue;
  }
}

// Function to check if a character is an operator (+, -, ×, ÷)
function isOperator(char) {
  return ['+', '-', '×', '÷'].includes(char);
}

// Function to handle operator button clicks
function handleOperatorClick(newOperator, lastChar) {
  if (lastChar === "=") {
    // If the last result is displayed and user clicks an operator, clear the input
    input.innerHTML = "";
  } else if (isOperator(lastChar)) {
    // If the last character is an operator, replace it with the new one
    input.innerHTML = currentString.slice(0, -1) + newOperator;
  } else if (currentString.length === 0) {
    console.log("Enter a number first");
  } else {
    input.innerHTML += newOperator;
  }
}

// Function to calculate and display the result
function calculateResult() {
  const inputString = input.innerHTML;
  const operatorsArray = inputString.replace(/[0-9]|\./g, "").split('');
  const numbersArray = inputString.split(/\+|\-|\×|\÷/g).map(parseFloat);

  let resultValue = numbersArray[0];

  for (let i = 0; i < operatorsArray.length; i++) {
    const operator = operatorsArray[i];
    const nextNumber = numbersArray[i + 1];

    switch (operator) {
      case '+':
        resultValue += nextNumber;
        break;
      case '-':
        resultValue -= nextNumber;
        break;
      case '×':
        resultValue *= nextNumber;
        break;
      case '÷':
        resultValue /= nextNumber;
        break;
    }
  }

  input.innerHTML = resultValue;
  resultDisplayed = true;
}

// Add click handlers to number buttons and operator buttons
numbers.forEach(button => button.addEventListener("click", handleButtonClick));
operators.forEach(button => button.addEventListener("click", handleButtonClick));

// Handle clearing the input on press of clear button
clear.addEventListener("click", function() {
  input.innerHTML = ""; // Clear the input
});

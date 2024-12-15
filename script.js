const numbers = document.querySelectorAll(`.number_btn`);
const operations = document.querySelectorAll(`.operation_btn`);
const buffer = document.querySelector(`.buffer`);
const operational_buttons = ["+", "-", "*", "/"];

const addToBuffer = function (value) {
  buffer.innerHTML += value;
};
const clearBuffer = function () {
  buffer.innerHTML = "";
};
const overwriteBuffer = function (value) {
  clearBuffer();
  addToBuffer(value);
};
const displayError = function () {
  overwriteBuffer("ERROR");
  setTimeout(() => clearBuffer(), 3000);
};

const add = function (a, b) {
  return a + b;
};
const substract = function (a, b) {
  return a - b;
};
const multiply = function (a, b) {
  if (a === 0 && b === 0) {
    displayError();
    return;
  }
  return a * b;
};
const divide = function (a, b) {
  if (b === 0) {
    displayError();
    return;
  }
  return a / b;
};

const determineOperation = function (expr) {
  return operational_buttons.filter((operation) => expr.includes(operation))[0];
};

const countOperations = function (expr) {
  if (expr.length === 0) return;
  let counter = 0;
  for (let i = 0; i < expr.length; i++)
    if (operational_buttons.includes(expr[i])) counter++;
  return counter;
};

const evaluate = function (expr) {
  const operationsCount = countOperations(expr);
  if (operationsCount > 1) {
    displayError();
    return;
  }
  const operation = determineOperation(expr);
  const nums = expr.split(operation);
  if (nums.length !== 2) return;
  let result;
  if (operation === "+") result = add(+nums[0], +nums[1]);
  if (operation === "-") result = substract(+nums[0], +nums[1]);
  if (operation === "*") result = multiply(+nums[0], +nums[1]);
  if (operation === "/") result = divide(+nums[0], +nums[1]);
  if (result === undefined) return;
  overwriteBuffer(result);
};

numbers.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    addToBuffer(e.target.id);
  })
);
operations.forEach((btn) =>
  btn.addEventListener("click", function (e) {
    if (e.target.id === "=" || e.target.id === "clear") {
      if (e.target.id === "clear") clearBuffer();
      else evaluate(buffer.innerHTML);
    } else {
      addToBuffer(e.target.id);
    }
  })
);

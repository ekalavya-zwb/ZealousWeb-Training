const add = (x, y) => {
  return x + y;
};

const subtract = (x, y) => {
  return x - y;
};

const multiply = (x, y) => {
  return x * y;
};

const divide = (x, y) => {
  return (x / y).toFixed(2);
};

console.log("Addition:", add(8, 7));
console.log("Subtraction:", subtract(8, 7));
console.log("Multiplication:", multiply(8, 7));
console.log("Division:", divide(8, 7));

const heightChecker = function (heights) {
  for (let i = 0; i < heights.length; i++) {}
  let count = 0;
  for (let i = 0; i < heights.length; i++) {
    if (heights[i] === expected[i]) {
      console.log(heights[i], expected[i]);
      count++;
    }
  }
  return heights;
};

console.log(heightChecker([0, 1, 0, 3, 12]));

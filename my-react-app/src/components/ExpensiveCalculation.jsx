import React, { useState, useMemo } from "react";

// Without useMemo hook
// const ExpensiveCalculation = () => {
//   const [count, setCount] = useState(0);

//   const largeArr = Array.from({ length: 10_000_000 }, (_, index) => index + 1);

//   const sum = largeArr.reduce(
//     (accumulator, element) => accumulator + element,
//     0,
//   );

//   console.log("Recalculating sum...");

//   return (
//     <>
//       <h2>Count: {count}</h2>
//       <h3>Sum: {sum}</h3>

//       <button onClick={() => setCount((c) => c + 1)}>Increment</button>
//     </>
//   );
// };

// With useMemo hook
const ExpensiveCalculation = () => {
  const [count, setCount] = useState(0);

  const largeArr = useMemo(() => {
    return Array.from({ length: 10_000_000 }, (_, index) => index + 1);
  }, []);

  const sum = useMemo(() => {
    return largeArr.reduce((accumulator, element) => accumulator + element, 0);
  }, [largeArr]);

  console.log("Recalculating sum...");

  return (
    <>
      <h2>Count: {count}</h2>
      <h3>Sum: {sum}</h3>

      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </>
  );
};

export default ExpensiveCalculation;

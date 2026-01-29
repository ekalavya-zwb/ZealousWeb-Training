import React, { useState, useEffect } from "react";

const HooksPractice = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => setCount((count) => count + 1), 1000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
      <h1>Count: {count}</h1>
    </>
  );
};

// const HooksPractice = () => {
//   const [count, setCount] = useState(0);
//   const [calculation, setCalculation] = useState(0);

//   useEffect(() => setCalculation(() => count * 3), [count]);
//   return (
//     <>
//       <button
//         type="button"
//         onClick={() => setCount((prevCount) => prevCount + 1)}
//       >
//         Increment
//       </button>
//       <h1>
//         3 x {count} = {calculation}
//       </h1>
//     </>
//   );
// };

export default HooksPractice;

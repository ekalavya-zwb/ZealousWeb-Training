import React, { useRef, useEffect, useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = useRef();

  useEffect(() => {
    prevCount.current = count;
  }, [count]);

  return (
    <>
      <h2>Now: {count}</h2>
      <h3>Before: {prevCount.current}</h3>
      <button onClick={() => setCount((c) => c + 1)}>+</button>
    </>
  );
}

export default Counter;

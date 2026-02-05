import React, { useCallback, useState } from "react";
import Child from "./Child";

const Parent = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  // Without useCallback
  //   const increment = () => setCount((prevCount) => prevCount + 1);

  // With useCallback
  const increment = useCallback(
    () => setCount((prevCount) => prevCount + 1),
    [],
  );

  console.log("Parent rendered!");

  return (
    <>
      <h2>Parent Count: {count}</h2>
      <h2>Text: {text}</h2>

      <button type="button" onClick={() => setText("hello")}>
        Change unrelated state
      </button>

      <Child onIncrement={increment} />
    </>
  );
};

export default Parent;

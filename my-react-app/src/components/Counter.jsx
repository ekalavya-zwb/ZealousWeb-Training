import React from "react";
import { useState } from "react";
import "../styles/Counter.css";

const Counter = () => {
  const [count, setCount] = useState(0);
  let message = "";
  const incrementByOne = () => {
    if (count < 100) setCount((prevCount) => prevCount + 1);
  };
  const incrementByFive = () => {
    if (count < 100) setCount((prevCount) => prevCount + 5);
  };
  const double = () => {
    if (count < 50) setCount((prevCount) => prevCount * 2);
  };
  const half = () => {
    if (count > 1) setCount((prevCount) => prevCount / 2);
  };
  const decrementByOne = () => {
    if (count > 0) setCount((prevCount) => prevCount - 1);
  };
  const decrementByFive = () => {
    if (count > 4) setCount((prevCount) => prevCount - 5);
  };
  switch (count) {
    case 100:
      message = "Count cannot exceed 100!";
      break;
    case 0:
      message = "Count cannot go below 0!";
      break;
  }
  return (
    <>
      <h1>Counter</h1>
      <div className="count-display">{count}</div>
      <div className="btn-container">
        {count === 100 ? (
          <button
            type="button"
            onClick={incrementByOne}
            disabled={count === 100}
            style={{
              backgroundColor: "#f5f6f8",
              color: "#9aa0a6",
              border: "1px solid #e3e6ea",
            }}
          >
            +1
          </button>
        ) : (
          <button
            type="button"
            onClick={incrementByOne}
            disabled={count === 100}
          >
            +1
          </button>
        )}
        <button
          type="button"
          onClick={incrementByFive}
          disabled={count === 100}
        >
          +5
        </button>
        <button type="button" onClick={double} disabled={count === 100}>
          Double
        </button>
        <button type="button" onClick={() => setCount(0)}>
          Reset
        </button>
        <button type="button" onClick={half} disabled={count <= 1}>
          Half
        </button>
        {count === 0 ? (
          <button
            type="button"
            onClick={decrementByOne}
            disabled={count === 0}
            style={{
              backgroundColor: "#f5f6f8",
              color: "#9aa0a6",
              border: "1px solid #e3e6ea",
            }}
          >
            -1
          </button>
        ) : (
          <button type="button" onClick={decrementByOne} disabled={count === 0}>
            -1
          </button>
        )}

        <button type="button" onClick={decrementByFive} disabled={count <= 4}>
          -5
        </button>
      </div>
      <div className="error-msg">{message}</div>
    </>
  );
};

export default Counter;

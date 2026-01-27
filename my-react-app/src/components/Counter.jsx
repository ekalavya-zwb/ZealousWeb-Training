import React from "react";
import { useState } from "react";
import "../styles/Counter.css";

const Counter = () => {
  const [count, setCount] = useState(0);
  const MIN = 0;
  const MAX = 100;

  const message =
    count === MAX
      ? "Count cannot exceed 100!"
      : count === MIN
        ? "Count cannot go below 0!"
        : "";

  return (
    <>
      <h1>Counter</h1>
      <div className="count-display">{count}</div>
      <div className="btn-container">
        <button
          type="button"
          onClick={() => setCount((prevCount) => prevCount + 1)}
          disabled={count === MAX}
          className={count === MAX ? "danger" : ""}
        >
          +1
        </button>
        <button
          type="button"
          onClick={() => setCount((prevCount) => prevCount + 5)}
          disabled={count + 5 > MAX}
          className={count + 5 > MAX ? "danger" : ""}
        >
          +5
        </button>
        <button
          type="button"
          onClick={() => setCount((prevCount) => prevCount * 2)}
          disabled={count * 2 > MAX}
          className={count * 2 > MAX ? "danger" : ""}
        >
          Double
        </button>
        <button type="button" onClick={() => setCount(0)}>
          Reset
        </button>
        <button
          type="button"
          onClick={() => setCount((prevCount) => prevCount / 2)}
          disabled={count <= 0}
          className={count <= 0 ? "danger" : ""}
        >
          Half
        </button>
        <button
          type="button"
          onClick={() => setCount((prevCount) => prevCount - 1)}
          disabled={count - 1 < MIN}
          className={count - 1 < MIN ? "danger" : ""}
        >
          -1
        </button>

        <button
          type="button"
          onClick={() => setCount((prevCount) => prevCount - 5)}
          disabled={count - 5 < MIN}
          className={count - 5 < MIN ? "danger" : ""}
        >
          -5
        </button>
      </div>
      <div className="error-msg">{message}</div>
    </>
  );
};

export default Counter;

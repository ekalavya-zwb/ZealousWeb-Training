import React, { useReducer } from "react";
import styles from "../styles/UseReducerCounter.module.css";

const UseReducerCounter = () => {
  const [state, dispatch] = useReducer(countReducer, { count: 0 });

  function countReducer(state, action) {
    switch (action.type) {
      case "Increment":
        if (state.count >= 100) {
          return state;
        }
        return { count: state.count + 1 };

      case "Decrement":
        if (state.count <= 0) {
          return state;
        }
        return { count: state.count - 1 };

      case "Reset":
        return { count: 0 };

      default:
        return state;
    }
  }
  return (
    <>
      <h1>Counter</h1>
      <p className={styles.countDisplay}>{state.count}</p>
      <div className={styles.btnContainer}>
        <button
          type="button"
          onClick={() => dispatch({ type: "Increment" })}
          disabled={state.count >= 100}
        >
          Increment
        </button>
        <button
          type="button"
          onClick={() => dispatch({ type: "Decrement" })}
          disabled={state.count <= 0}
        >
          Decrement
        </button>
        <button type="button" onClick={() => dispatch({ type: "Reset" })}>
          Reset
        </button>
      </div>
    </>
  );
};

export default UseReducerCounter;

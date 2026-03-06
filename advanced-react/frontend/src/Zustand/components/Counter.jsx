import React, { useEffect } from "react";
import useCounterStore from "../store/counterStore";
import "../styles/Counter.css";

// const logCount = () => {
//   const count = useCounterStore.getState().count;
//   console.log("count:", count);
// };

// const setCount = () => {
//   useCounterStore.setState({ count: 5 });
// };

const Counter = () => {
  const { count, increment, decrement, reset, asyncIncrement } =
    useCounterStore();

  // useEffect(() => {
  //   logCount();
  // }, [count]);

  // useEffect(() => {
  //   setCount();
  // }, []);

  return (
    <div className="counter-container">
      <h1>{count}</h1>
      <div className="btn-container">
        <button onClick={increment}>increment</button>
        <button onClick={asyncIncrement}>asyncIncrement</button>
        <button onClick={reset}>reset</button>
        <button onClick={decrement}>decrement</button>
      </div>
    </div>
  );
};

export default Counter;

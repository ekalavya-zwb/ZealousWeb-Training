import React, { useState, useEffect } from "react";
import styles from "../styles/Timer.module.css";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const reset = () => {
    setSeconds(0);
    setMinutes(0);
    setIsRunning(false);
  };

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds === 59) {
          setMinutes((prevMinutes) => {
            if (prevMinutes === 59) {
              setHours((prevHours) => prevHours + 1);
              return 0;
            }
            return prevMinutes + 1;
          });
          return 0;
        }
        return prevSeconds + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning]);

  return (
    <>
      <h1 className={styles.timeContainer}>
        {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </h1>
      <div className={styles.btnContainer}>
        <button type="button" onClick={() => setIsRunning((prev) => !prev)}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button type="button" onClick={reset}>
          Reset
        </button>
      </div>
    </>
  );
};

export default Timer;

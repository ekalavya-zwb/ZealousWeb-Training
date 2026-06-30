import { useEffect, useRef, useState } from "react";

export default function useTimer({ initialSeconds = 0, isCountdown = false }) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setSeconds(initialSeconds);
    setIsRunning(false);
  };

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (isCountdown && prevSeconds <= 0) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return isCountdown ? prevSeconds - 1 : prevSeconds + 1;
        });
      }, 1000);
    } else if (!isRunning && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, isCountdown]);

  return { seconds, isRunning, start, stop, reset };
}

import useTimer from "../hooks/useTimer";

export default function CountDown({ initialSeconds }) {
  const { seconds, isRunning, start, stop, reset } = useTimer({
    initialSeconds,
    isCountdown: true,
  });

  return (
    <>
      <h2 className="text-center text-xl">Custom hook design pattern</h2>
      <div className="flex flex-col items-center gap-4 p-4">
        <h2 className="text-2xl font-bold">CountDown</h2>
        <p className="font-mono text-3xl">{seconds}</p>
        <div>
          <button
            onClick={start}
            disabled={isRunning || seconds <= 0}
            className="mr-2 cursor-pointer rounded bg-green-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Start
          </button>
          <button
            onClick={stop}
            disabled={!isRunning}
            className="mr-2 cursor-pointer rounded bg-red-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Stop
          </button>
          <button
            onClick={reset}
            className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

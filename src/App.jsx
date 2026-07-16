import { useState, useEffect } from "react";

function CountdownTimer() {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const [timeLeft, setTimeLeft] = useState(0);

    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        if (!isRunning) return;

        if (timeLeft <= 0) {
            setIsRunning(false);
            return;
        }

        const interval = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);

    }, [isRunning, timeLeft]);

    function handleStart() {
        const totalSeconds =
            Number(minutes) * 60 + Number(seconds);

        setTimeLeft(totalSeconds);
        setIsRunning(true);
    }

    function handlePauseResume() {
        setIsRunning(prev => !prev);
    }

    function handleReset() {
        const totalSeconds =
            Number(minutes) * 60 + Number(seconds);

        setTimeLeft(totalSeconds);
        setIsRunning(false);
    }

    const displayMinutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");

    const displaySeconds = String(timeLeft % 60).padStart(2, "0");

    return (
        <div>

            <h2>Timer</h2>

            <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
            />

            Minutes

            <input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
            />

            Seconds

            <button onClick={handleStart}>
                Start
            </button>

            <button onClick={handlePauseResume}>
                Pause / Resume
            </button>

            <button onClick={handleReset}>
                Reset
            </button>

            <h1>
                {displayMinutes}:{displaySeconds}
            </h1>

        </div>
    );
}

export default CountdownTimer;
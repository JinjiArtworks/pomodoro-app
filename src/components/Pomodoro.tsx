import { useEffect, useRef } from "react";
import { usePomodoroStore } from "../store/usePomodoroStore";

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
};

export const Pomodoro = () => {
    const { timeLeft, isRunning, start, pause, reset, setTime, mode, setMode } = usePomodoroStore();
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Update document title based on mode and time
    useEffect(() => {
        let title = formatTime(timeLeft);
        switch (mode) {
            case "work":
                title += " - Time to Focus!";
                break;
            case "shortBreak":
                title += " - Time to break~";
                break;
            case "longBreak":
                title += " - Go sebat first!";
                break;
        }
        document.title = title;
    }, [timeLeft, mode]);

    useEffect(() => {
        let interval: number | undefined;
        if (isRunning && timeLeft > 0) {
            interval = window.setInterval(() => {
                setTime(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            if (audioRef.current) {
                audioRef.current.play();
            }
        }
        return () => clearInterval(interval);
    }, [isRunning, timeLeft]);

    const handleModeChange = (newMode: "work" | "shortBreak" | "longBreak") => {
        if (!isRunning) {
            setMode(newMode);
        }
    };

    const handleReset = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        reset();
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <audio ref={audioRef} src="/alarm.mp3" />
            <style>
                {`
                    @keyframes shake {
                        0%, 100% { transform: translateX(0); }
                        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                        20%, 40%, 60%, 80% { transform: translateX(5px); }
                    }
                    .shake {
                        animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
                        animation-iteration-count: infinite;
                    }
                `}
            </style>
            <div className="space-x-2 mb-4">
                <button
                    onClick={() => handleModeChange("work")}
                    className={`px-3 py-1 rounded transition-all ${isRunning
                        ? 'bg-gray-300 cursor-not-allowed'
                        : mode === 'work'
                            ? 'bg-blue-600 text-white ring-2 ring-blue-400 ring-offset-2 shadow-lg scale-105'
                            : 'bg-blue-500 text-white hover:bg-blue-600 hover:ring-1 hover:ring-blue-400'
                        }`}
                    disabled={isRunning}
                >
                    Work
                </button>
                <button
                    onClick={() => handleModeChange("shortBreak")}
                    className={`px-3 py-1 rounded transition-all ${isRunning
                        ? 'bg-gray-300 cursor-not-allowed'
                        : mode === 'shortBreak'
                            ? 'bg-purple-600 text-white ring-2 ring-purple-400 ring-offset-2 shadow-lg scale-105'
                            : 'bg-purple-500 text-white hover:bg-purple-600 hover:ring-1 hover:ring-purple-400'
                        }`}
                    disabled={isRunning}
                >
                    Short Break
                </button>
                <button
                    onClick={() => handleModeChange("longBreak")}
                    className={`px-3 py-1 rounded transition-all ${isRunning
                        ? 'bg-gray-300 cursor-not-allowed'
                        : mode === 'longBreak'
                            ? 'bg-pink-600 text-white ring-2 ring-pink-400 ring-offset-2 shadow-lg scale-105'
                            : 'bg-pink-500 text-white hover:bg-pink-600 hover:ring-1 hover:ring-pink-400'
                        }`}
                    disabled={isRunning}
                >
                    Long Break
                </button>
            </div>
            <h1 className={`text-6xl font-bold ${timeLeft === 0 ? 'shake text-red-500' : ''}`}>
                {formatTime(timeLeft)}
            </h1>
            <div className="mt-4 space-x-4">
                {!isRunning ? (
                    <button
                        onClick={start}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-all hover:ring-1 hover:ring-green-400 active:ring-2 active:ring-green-400 active:ring-offset-2 active:scale-105"
                    >
                        Start
                    </button>
                ) : (
                    <button
                        onClick={pause}
                        disabled={timeLeft === 0}
                        className={`px-4 py-2 rounded transition-all ${timeLeft === 0
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-yellow-500 text-white hover:bg-yellow-600 hover:ring-1 hover:ring-yellow-400 active:ring-2 active:ring-yellow-400 active:ring-offset-2 active:scale-105'
                            }`}
                    >
                        Pause
                    </button>
                )}
                <button
                    onClick={handleReset}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-all hover:ring-1 hover:ring-red-400 active:ring-2 active:ring-red-400 active:ring-offset-2 active:scale-105"
                >
                    Reset
                </button>
            </div>
        </div>
    );
};
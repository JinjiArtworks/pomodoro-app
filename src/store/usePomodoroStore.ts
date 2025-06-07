import { create } from "zustand";
import { persist } from "zustand/middleware";

type Mode = "work" | "shortBreak" | "longBreak";

interface Task {
    text: string;
    completed: boolean;
}

interface PomodoroState {
    mode: Mode;
    timeLeft: number;
    isRunning: boolean;
    tasks: Task[];
    currentTask: string;
    setMode: (mode: Mode) => void;
    setTime: (seconds: number) => void;
    start: () => void;
    pause: () => void;
    reset: () => void;
    addTask: (task: string) => void;
    removeTask: (index: number) => void;
    setCurrentTask: (task: string) => void;
    toggleTaskCompletion: (index: number) => void;
}

const defaultTime = {
    work: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
};

export const usePomodoroStore = create<PomodoroState>()(
    persist(
        (set) => ({
            mode: "work",
            timeLeft: defaultTime.work,
            isRunning: false,
            tasks: [],
            currentTask: "",
            setMode: (mode) =>
                set(() => ({
                    mode,
                    timeLeft: defaultTime[mode],
                    isRunning: false,
                })),
            setTime: (seconds) => set({ timeLeft: seconds }),
            start: () => set({ isRunning: true }),
            pause: () => set({ isRunning: false }),
            reset: () =>
                set((state) => ({
                    timeLeft: defaultTime[state.mode],
                    isRunning: false,
                })),
            addTask: (task) => set((state) => ({
                tasks: [...state.tasks, { text: task, completed: false }]
            })),
            removeTask: (index) =>
                set((state) => ({
                    tasks: state.tasks.filter((_, i) => i !== index),
                })),
            setCurrentTask: (task) => set({ currentTask: task }),
            toggleTaskCompletion: (index) =>
                set((state) => ({
                    tasks: state.tasks.map((task, i) =>
                        i === index ? { ...task, completed: !task.completed } : task
                    ),
                })),
        }),
        {
            name: "pomodoro-storage",
        }
    )
);

import { useState } from "react";
import { usePomodoroStore } from "../store/usePomodoroStore";

export const TaskList = () => {
    const { tasks, addTask, removeTask, toggleTaskCompletion } = usePomodoroStore();
    const [taskInput, setTaskInput] = useState("");

    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;

    const getCounterColor = () => {
        if (totalTasks === 0) return 'bg-gray-100';
        if (completedTasks === totalTasks) return 'bg-green-100 text-green-700';
        return 'bg-yellow-100 text-yellow-700';
    };

    const handleAdd = () => {
        if (taskInput.trim()) {
            addTask(taskInput.trim());
            setTaskInput("");
        }
    };

    return (
        <div className="flex justify-center items-center my-6">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">Task List</h2>
                    <div className={`text-sm px-3 py-1 rounded-full transition-colors ${getCounterColor()}`}>
                        {completedTasks}/{totalTasks} completed
                    </div>
                </div>
                <div className="flex gap-2">
                    <input
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        className="border rounded px-3 py-1 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add task"
                    />
                    <button
                        onClick={handleAdd}
                        className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-colors"
                    >
                        Add
                    </button>
                </div>
                <ul className="mt-4 space-y-2">
                    {tasks.map((task, idx) => (
                        <li key={idx} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => toggleTaskCompletion(idx)}
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${task.completed
                                        ? 'bg-green-500 border-green-500'
                                        : 'border-gray-400 hover:border-green-500'
                                        }`}
                                >
                                    {task.completed && (
                                        <svg
                                            className="w-3 h-3 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    )}
                                </button>
                                <span className={`text-gray-700 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                                    {task.text}
                                </span>
                            </div>
                            <button
                                onClick={() => removeTask(idx)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="mt-4 text-center">
                    <small className="italic text-gray-400">
                        stoopid idea by <a href="https://github.com/jinjiartworks" className="underline hover:text-gray-600 transition-colors" target="_blank" rel="noopener noreferrer">@jinjiartworks</a>
                    </small>
                </div>
            </div>
        </div>
    );
};
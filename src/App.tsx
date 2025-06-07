import { Pomodoro } from "./components/Pomodoro";
import { TaskList } from "./components/TaskList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-8">
      <h1 className="text-3xl font-bold text-center mb-2">Pomodoro App</h1>
      <span className="flex justify-center mb-2">
        <small className="italic">Select the working method: </small>
      </span>
      <Pomodoro />
      <TaskList />
    </div>
  );
}

export default App;

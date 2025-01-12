import './App.css'
import TaskForm from "./components/TaskForm.tsx";
import {TaskTable} from "./components/TaskTable.tsx";
import TodoOptions from "./components/TodoOptions.tsx";

function App() {
    return (
        <>
            <TodoOptions/>
            <div className="container mt-5">
                <TaskForm/>
                <TaskTable/>
            </div>
        </>
    )
}

export default App

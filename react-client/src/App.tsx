import './App.css'
import TaskForm from "./components/TaskForm.tsx";
import {TaskTable} from "./components/TaskTable.tsx";

function App() {
    return (
        <div className="container mt-5">
            <TaskForm/>
            <TaskTable/>
        </div>
    )
}

export default App

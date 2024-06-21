import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskForm from "./components/TaskForm.tsx";
import Task from "./models/Task.ts";
import TaskRow from "./components/TaskRow.tsx";

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);

    function removeTask(id: number){
        setTasks(tasks.filter(task => task.id !== id));
    }

    return (
        <div className="container mt-5">

            <TaskForm onSubmit={(task) => setTasks([...tasks, task])}/>

            <table className="table table-hover">
                <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Category</th>
                    <th scope="col">Deadline</th>
                    <th scope="col">Delete</th>
                </tr>
                </thead>
                <tbody>
                {tasks.map((task, index) => {
                    task.id = index;
                    return <TaskRow onDelete={(id) => removeTask(id)}
                                    task={task}
                                    key={index}/>
                })}
                </tbody>
            </table>
        </div>
    )
}

export default App

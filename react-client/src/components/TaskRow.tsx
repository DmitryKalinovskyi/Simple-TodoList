import Task from "../models/Task.ts";
import {useState} from "react";

interface TaskRowProps{
    task: Task,
    onComplete?: (id: number) => void;
    onDelete?: (id: number) => void;
}

export default function TaskRow(props: TaskRowProps ){
    const [task, setTask] = useState(props.task);
    const isCompleteCheckboxId = "isComplete-input-" + task.id;

    function changeComplition(e){
        setTask({...task, isCompleted: !task.isCompleted});
    }

    return (
        <tr>
            <td>
                <form method="post" className="d-flex align-items-center">
                    <input
                        name="isCompleted"
                        type="checkbox"
                        id={isCompleteCheckboxId}
                        checked={task.isCompleted}
                        onChange={changeComplition}
                        className="mx-2"/>
                    <label htmlFor={isCompleteCheckboxId}>
                        {task.isCompleted ? <s>{task.name}</s> : <>{task.name}</>}
                    </label>
                </form>
            </td>
            <td>
                <div className="badge mx-2 bg-primary">
                    {task.category?.name}
                </div>
            </td>

            <td>
                <div className="badge bg-secondary">
                    {task.deadline}
                </div>
            </td>

            <td>
                <button className="btn btn-danger" onClick={() => props.onDelete(task.id)}>
                    X
                </button>
            </td>
        </tr>
    )
}
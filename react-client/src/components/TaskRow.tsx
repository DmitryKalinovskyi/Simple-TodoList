import Task from "../models/Task.ts";
import {useDispatch} from "react-redux";
import {change_complition, remove_task} from "../state/tasksSlice.ts";

interface TaskRowProps{
    task: Task,
    onComplete?: (id: number) => void;
    onDelete?: (id: number) => void;
}

export default function TaskRow(props: TaskRowProps ){
    const task = props.task;
    // const [task, setTask] = useState(props.task);
    const dispatch = useDispatch();
    const isCompleteCheckboxId = "isComplete-input-" + task.id;

    return (
        <tr>
            <td>
                <form method="post" className="d-flex align-items-center">
                    <input
                        name="isCompleted"
                        type="checkbox"
                        id={isCompleteCheckboxId}
                        checked={task.isCompleted}
                        onChange={() => dispatch(change_complition(task.id))}
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
                <button className="btn btn-danger" onClick={() => dispatch(remove_task(task.id))}>
                    X
                </button>
            </td>
        </tr>
    )
}
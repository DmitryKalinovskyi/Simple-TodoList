import TaskRow from "./TaskRow.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../state/store.ts";

export function TaskTable(){
    const tasks = useSelector((state: RootState) => state.tasks.tasks);

    return (
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
            {tasks.map((task) => <TaskRow task={task} key={task.id}/>)}
            </tbody>
        </table>
    )
}
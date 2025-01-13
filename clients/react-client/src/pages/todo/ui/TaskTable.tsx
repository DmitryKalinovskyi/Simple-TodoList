import TaskRow from "./TaskRow.tsx";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../state/store.ts";
import Task from "../../../models/Task.ts";
import {useEffect} from "react";
import { fetch_tasks } from "../api/epics/fetchTasksEpic.ts";

export function TaskTable(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetch_tasks())
    }, [dispatch]);

    const tasks = useSelector((state: RootState) => state.tasks.tasks);

    function sortTasks(tasks: Task[]){
        tasks = [...tasks];
        return tasks.sort((a, b) => {
            // put completed after uncompleted
            if(a.isCompleted !== b.isCompleted)
                return a.isCompleted ? 1: -1;

            // then order by deadline
            if(a.deadline && b.deadline)
                return a.deadline < b.deadline? 1: -1;

            if(a.deadline || b.deadline)
                return a.deadline? -1: 1;

            // order by name
            return a.name < b.name? 1: -1;
        });
    }

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
            {sortTasks(tasks).map((task) => <TaskRow task={task} key={task.id}/>)}
            </tbody>
        </table>
    )
}
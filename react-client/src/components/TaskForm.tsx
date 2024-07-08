import {useState} from "react";
import Task from "../models/Task.ts";
import {useDispatch} from "react-redux";
import {add_task} from "../state/tasksSlice.ts";

interface TaskFormProps{
}


export default function TaskForm(props: TaskFormProps){
    const [name, setName] = useState("");
    const [deadline, setDeadline] = useState<string>("");
    // const [categoryId, setCategoryId] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const dispatch = useDispatch();

    function submitTask(){
        // ignore when name is empty
        if(name.trim() == "") return;

        const task: Task = {
            id: 0,
            name,
            isCompleted: false
        }

        if(deadline != "") task.deadline = deadline;
        if(category != "") task.category = {id: 0, name: category}
        // if(categoryId != "" && !isNaN(+categoryId)) task.categoryId = +categoryId;

        dispatch(add_task(task))
        setName("");
        setDeadline("");
        // setCategoryId("");
        setCategory("");
    }

    return <>
        <div className="d-flex flex-wrap align-items-start">
            <div className="row g-3">
                <div className="col-auto">
                    <label
                        className="visually-hidden">
                        Task name
                    </label>
                    <input
                        name="Name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter task name..."/>
                </div>

                <div className="col-auto">
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        value={category}
                        className="form-select">
                        <option selected>
                            Select Category
                        </option>
                        <option>Sport</option>
                        <option>Learning</option>
                        <option>Work</option>
                    </select>
                </div>

                <div className="col-auto">
                    <input name="Deadline"
                           className="form-control"
                           type="datetime-local"
                           value={deadline}
                           onChange={(e) => setDeadline(e.target.value)}
                    />
                </div>

                <div className="col-auto">
                    <button type="submit"
                            className="btn btn-primary mb-3"
                            onClick={submitTask}
                    >Add task</button>
                </div>
            </div>
        </div>
    </>
}
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../state/store.ts";
import {add_task_request} from "../state/epics/tasksEpics.ts";
import {CreateTaskInput} from "../models/CreateTaskInput.ts";

interface TaskFormProps{
}


export default function TaskForm(props: TaskFormProps){
    const categories = useSelector((state: RootState) => state.categories.categories);

    const [name, setName] = useState("");
    const [deadline, setDeadline] = useState<string>("");
    const [categoryId, setCategoryId] = useState<string>("");
    // const [category, setCategory] = useState<string>("");
    const dispatch = useDispatch();

    function submitTask(){
        // ignore when name is empty
        if(name.trim() == "") return;

        const task: CreateTaskInput = {
            name,
            isCompleted: false
        }
        if(deadline != "") task.deadline = new Date(deadline).toISOString();

        if(+categoryId) task.categoryId = +categoryId;

        dispatch(add_task_request(task))
        setName("");
        setDeadline("");
        setCategoryId("");
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
                        onChange={(e) => setCategoryId(e.target.value)}
                        value={categoryId}
                        className="form-select">
                        <option>
                            Select Category
                        </option>
                        {categories.map((c) => {
                            return <option value={c.id} key={c.id}>{c.name}</option>
                        })}
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
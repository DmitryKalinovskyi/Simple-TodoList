import { useDispatch, useSelector } from "react-redux";
import { TodoListRootState } from "../../../state/store.ts";
import { CreateTaskInput } from "../../../models/CreateTaskInput.ts";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { createTask } from "../state/tasksSlice.ts";

export default function TaskForm() {
    const categories = useSelector((state: TodoListRootState) => state.categories.categories);

    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
            deadline: "",
            categoryId: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required()
                .min(1).max(200),
        }),
        onSubmit: (values, {resetForm}) => {
            const task: CreateTaskInput = {
                name: values.name,
                deadline: values.deadline == "" ? undefined : new Date(values.deadline).toISOString(),
                isCompleted: false
            };

            if(values.categoryId !== "")
                task.categoryId = +values.categoryId;

            dispatch(createTask(task))
            resetForm();
        },
    });

    return <form onSubmit={formik.handleSubmit}>
        <div className="d-flex flex-wrap align-items-start">
            <div className="row g-3">
                <div className="col-auto">
                    <label className="visually-hidden">
                        Task name
                    </label>
                    <input
                        name="name"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        placeholder="Enter task name..." />
                </div>

                <div className="col-auto">
                    <select
                        name="categoryId"
                        onChange={formik.handleChange}
                        value={formik.values.categoryId}
                        className="form-select">
                        <option value="">
                            Select Category
                        </option>
                        {categories.map((c) => {
                            return <option value={c.id} key={c.id}>{c.name}</option>
                        })}
                    </select>
                </div>

                <div className="col-auto">
                    <input name="deadline"
                        className="form-control"
                        type="datetime-local"
                        value={formik.values.deadline}
                        onChange={formik.handleChange}
                    />
                </div>

                <div className="col-auto">
                    <button type="submit"
                        className="btn btn-primary mb-3"
                    >
                        Add task
                    </button>
                </div>
            </div>
        </div>
    </form>
}
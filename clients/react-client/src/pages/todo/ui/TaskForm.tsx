import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store.ts";
import { CreateTaskInput } from "../../../models/CreateTaskInput.ts";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { add_task_request } from "../api/epics/createTaskEpic.ts";

export default function TaskForm() {
    const categories = useSelector((state: RootState) => state.categories.categories);

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
            console.log(values)
            const task: CreateTaskInput = {
                name: values.name,
                isCompleted: false
            };

            if(values.deadline !== "") 
                task.deadline = new Date(values.deadline).toISOString()
            if(values.categoryId !== "")
                task.categoryId = +values.categoryId;

            console.log(task);

            dispatch(add_task_request(task))
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
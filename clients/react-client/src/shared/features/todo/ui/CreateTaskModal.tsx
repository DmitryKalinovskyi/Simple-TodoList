import { useDispatch, useSelector } from "react-redux";
import { TodoListRootState } from "../../../../state/store.ts";
import { CreateTaskInput } from "../../../../models/CreateTaskInput.ts";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { closeCreateTaskModal, createTask } from "../state/tasksSlice.ts";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";

export default function CreateTaskModal() {
    const categories = useSelector((state: TodoListRootState) => state.categories.categories);
    const isOpen = useSelector((state: TodoListRootState) => state.tasks.isCreateTaskModalOpen);
    const initial = useSelector((state: TodoListRootState) => state.tasks.createTaskModalInitial);
    const dispatch = useDispatch();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: initial.name,
            deadline: initial.deadline,
            categoryId: initial.categoryId,
        },
        validationSchema: Yup.object({
            name: Yup.string().required()
                .min(1).max(200),
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            const task: CreateTaskInput = {
                name: values.name,
                deadline: values.deadline,
                isCompleted: false
            };

            if (values.categoryId)
                task.categoryId = +values.categoryId;

            dispatch(createTask(task))
            resetForm();
        },
    });

    const close = () => {
        dispatch(closeCreateTaskModal());
    }

    return <>
        <Modal title="Create new Task" open={isOpen} onCancel={close}
            footer={[
                <Button key="cancel" onClick={close}>
                    Cancel
                </Button>,
                <Button key="add-task" type="primary" onClick={() => formik.submitForm()}>
                    Add task
                </Button>
            ]}
        >
            <Form>
                <Form.Item>
                    <Input name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        placeholder="Enter task name..." />
                </Form.Item>
                <Form.Item>
                    <Select
                        showSearch
                        allowClear
                        placeholder="Select category"
                        optionFilterProp="label"
                        value={formik.values.categoryId}
                        onChange={(value) => formik.setFieldValue("categoryId", value)}
                        options={[
                            ...categories.map((c) => { return { value: c.id, label: c.name } })
                        ]}>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <DatePicker
                        placeholder="Select deadline"
                        format="DD/MM/YYYY hh:mm A"
                        onChange={(date) => formik.setFieldValue("deadline", date)}
                        showTime={{ use12Hours: true }}
                        value={formik.values.deadline}
                    />
                </Form.Item>
            </Form>
        </Modal>
    </>
}
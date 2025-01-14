import { useDispatch, useSelector } from "react-redux";
import { TodoListRootState } from "../../../state/store.ts";
import { CreateTaskInput } from "../../../models/CreateTaskInput.ts";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { createTask } from "../state/tasksSlice.ts";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";

interface CreateTaskModalProps {
    isOpen: boolean,
    onClose: () => void
}

export default function CreateTaskModal(props: CreateTaskModalProps) {
    const categories = useSelector((state: TodoListRootState) => state.categories.categories);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
            deadline: undefined,
            categoryId: undefined,
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

    const handleClose = () => {
        props.onClose();
    }

    return <>
        <Modal title="Create new Task" open={props.isOpen} onCancel={handleClose}
            footer={[
                <Button key="cancel">
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
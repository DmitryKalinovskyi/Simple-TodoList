import { useDispatch, useSelector } from "react-redux";
import { Form, useFormik } from "formik";
import * as Yup from 'yup';
import dayjs from "dayjs";
import { TodoListRootState } from "@/state/store.js";
import UpdateTaskInput from "@/models/UpdateTaskInput";
import { Input } from "hammerjs";
import React from "react";
import { Modal, Button, View } from "react-native";
import { updateTask, closeUpdateTaskModal } from "../state/tasksSlice";

export default function UpdateTaskModal() {
    const categories = useSelector((state: TodoListRootState) => state.categories.categories);
    const isOpen = useSelector((state: TodoListRootState) => state.tasks.isUpdateTaskModalOpen);
    const selectedTask = useSelector((state: TodoListRootState) => state.tasks.operationTask);
    const dispatch = useDispatch();
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: selectedTask?.name ?? "",
            deadline: selectedTask?.deadline,
            categoryId: selectedTask?.category?.id,
        },
        validationSchema: Yup.object({
            name: Yup.string().required()
                .min(1).max(200),
        }),
        onSubmit: (values) => {
            if(selectedTask){
                const input: UpdateTaskInput = {
                    id: selectedTask.id,
                    name: values.name,
                    deadline: values.deadline ?? null,
                    isCompleted: selectedTask.isCompleted,
                    categoryId: values.categoryId ?? null
                };
                
                dispatch(updateTask(input))
                close();
            }
        },
    });

    const close = () => {
        dispatch(closeUpdateTaskModal());
    }

    return <View></View>
    // return <>
    //     <Modal title="Update Task" open={isOpen} onCancel={close}
    //         footer={[
    //             <Button key="cancel" onClick={close}>
    //                 Cancel
    //             </Button>,
    //             <Button key="update-task" type="primary" onClick={() => formik.submitForm()}>
    //                 Update
    //             </Button>
    //         ]}
    //     >
    //         <Form>
    //             <Form.Item>
    //                 <Input name="name"
    //                     onChange={formik.handleChange}
    //                     value={formik.values.name}
    //                     placeholder="Enter task name..." />
    //             </Form.Item>
    //             <Form.Item>
    //                 <Select
    //                     showSearch
    //                     allowClear
    //                     placeholder="Select category"
    //                     optionFilterProp="label"
    //                     value={formik.values.categoryId}
    //                     onChange={(value) => formik.setFieldValue("categoryId", value)}
    //                     options={[
    //                         ...categories.map((c) => { return { value: c.id, label: c.name } })
    //                     ]}>
    //                 </Select>
    //             </Form.Item>
    //             <Form.Item>
    //                 <DatePicker
    //                     placeholder="Select deadline"
    //                     format="DD/MM/YYYY hh:mm A"
    //                     onChange={(date) => formik.setFieldValue("deadline", date)}
    //                     showTime={{ use12Hours: true }}
    //                     value={formik.values.deadline ? dayjs(formik.values.deadline) : undefined}
    //                 />
    //             </Form.Item>
    //         </Form>
    //     </Modal>
    // </>
}
import { Modal, Button, Form, Input } from "antd"
import { closeUpdateCategoryModal, updateCategory } from "../../../shared/features/categories/state/categoriesSlice";
import { UpdateCategoryInput } from "../../../models/UpdateCategoryInput";
import { useDispatch, useSelector } from "react-redux";
import { TodoListRootState } from "../../../state/store";
import { useFormik } from "formik";
import * as Yup from "yup"

export default function UpdateCategoryModal() {
    const dispatch = useDispatch();
    const selectedCategory = useSelector((state: TodoListRootState) => state.categories.operationCategory);
    const isOpen = useSelector((state: TodoListRootState) => state.categories.isUpdateCategoryModalOpen);
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: selectedCategory?.name ?? "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required()
                .min(1).max(200),
        }),
        onSubmit: (values) => {
            if(selectedCategory){
                const input: UpdateCategoryInput = {
                    id: selectedCategory.id,
                    name: values.name,
                };
                
                dispatch(updateCategory(input))
                close();
            }
        },
    });

    const close = () => {
        dispatch(closeUpdateCategoryModal());
    }

    return <>
        <Modal title="Create new Task" open={isOpen} onCancel={close}
            footer={[
                <Button key="cancel" onClick={close}>
                    Cancel
                </Button>,
                <Button key="add-task" type="primary" onClick={() => formik.submitForm()}>
                    Update
                </Button>
            ]}
        >
            <Form>
                <Form.Item>
                    <Input name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        placeholder="Enter category name..." />
                </Form.Item>
            </Form>
        </Modal></>
}
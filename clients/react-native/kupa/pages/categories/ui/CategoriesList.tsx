import { DeleteFilled, EditFilled } from "@ant-design/icons"
import { List, Flex, Button } from "antd"
import { useDispatch, useSelector } from "react-redux";
import { TodoListRootState } from "../../../state/store";
import { deleteCategory, showUpdateCategoryModal } from "../../../shared/features/categories/state/categoriesSlice";

export default function CategoriesList(){
    const dispatch = useDispatch();
    const categories = useSelector((state: TodoListRootState) => state.categories.categories);

    return <List
    dataSource={categories}
    renderItem={(category) => {
        return <List.Item>
            <Flex justify="space-between" align="center" style={{width: "100%"}}>
                <div>{category.name}</div>
                <div>
                    <Button type="text" onClick={() => dispatch(showUpdateCategoryModal(category))}>
                        <EditFilled />
                    </Button>
                    <Button danger type="text" onClick={() => dispatch(deleteCategory(category.id))}>
                        <DeleteFilled />
                    </Button>
                </div>
            </Flex>
        </List.Item>
    }} />
}
import { Flex, FloatButton } from "antd";
import CategoriesList from "./ui/CategoriesList";
import CategoriesInput from "./ui/CategoriesInput";
import UpdateCategoryModal from "./ui/UpdateCategoryModal";
import { SettingOutlined, PlusOutlined } from "@ant-design/icons";
import { showSettingsModal } from "../../shared/features/settings/state/settingsSlice";
import SettingsModal from "../../shared/features/settings/ui/SettingsModal";
import { showCreateTaskModal } from "../../shared/features/todo/state/tasksSlice";
import CreateTaskModal from "../../shared/features/todo/ui/CreateTaskModal";
import { useDispatch } from "react-redux";

export default function CategoriesPage() {
    const dispatch = useDispatch();
    return <>
        <UpdateCategoryModal />
        <SettingsModal />
        <CreateTaskModal />
        <FloatButton.Group>
            <FloatButton icon={<SettingOutlined />} onClick={() => dispatch(showSettingsModal())} />
            <FloatButton icon={<PlusOutlined />} onClick={() => dispatch(showCreateTaskModal())} />
        </FloatButton.Group>
        <Flex justify="center" style={{ overflow: "auto", height: "100%", padding: "20px" }}>
            <div style={{ maxWidth: "600px", width: "100%" }}>
                <CategoriesInput />
                <CategoriesList />
            </div>
        </Flex>
    </>
}
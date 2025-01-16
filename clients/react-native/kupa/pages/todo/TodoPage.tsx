import SettingsModal from "../../shared/features/settings/ui/SettingsModal";
import CreateTaskModal from "../../shared/features/todo/ui/CreateTaskModal";
import { Flex, FloatButton } from "antd";
import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
import useSetting from "../../shared/features/settings/hooks/useSetting";
import CollapsableTasks from "./ui/CollapsableTasks";
import Tasks from "./ui/Tasks";
import UpdateTaskModal from "../../shared/features/todo/ui/UpdateTaskModal";
import { useDispatch } from "react-redux";
import { showCreateTaskModal } from "../../shared/features/todo/state/tasksSlice";
import { showSettingsModal } from "../../shared/features/settings/state/settingsSlice";

export default function TodoPage() {
    const dispatch = useDispatch();
    const [groupedTasks] = useSetting<boolean>("groupedTasks");

    return (
        <Flex justify="center" style={{overflow: "auto", height: "100%", padding: "20px"}}>
            <SettingsModal />
            <CreateTaskModal />
            <UpdateTaskModal />
            <FloatButton.Group>
                <FloatButton icon={<SettingOutlined />} onClick={() => dispatch(showSettingsModal())} />
                <FloatButton icon={<PlusOutlined />} onClick={() => dispatch(showCreateTaskModal())} />
            </FloatButton.Group>

            {groupedTasks ? <CollapsableTasks /> : <Tasks />}
        </Flex>
    )
}
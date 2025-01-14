import SettingsModal from "../../shared/features/settings/ui/SettingsModal";
import CreateTaskModal from "./ui/CreateTaskModal";
import { FloatButton } from "antd";
import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
import useSetting from "../../shared/features/settings/hooks/useSetting";
import CollapsableTasks from "./ui/CollapsableTasks";
import Tasks from "./ui/Tasks";
import UpdateTaskModal from "./ui/UpdateTaskModal";
import { useDispatch } from "react-redux";
import { showCreateTaskModal } from "../../shared/features/todo/state/tasksSlice";
import { showSettingsModal } from "../../shared/features/settings/state/settingsSlice";

export default function TodoPage() {
    const dispatch = useDispatch();
    const [groupedTasks] = useSetting<boolean>("groupedTasks");

    return (
        <>
            <SettingsModal />
            <CreateTaskModal />
            <UpdateTaskModal />
            <FloatButton.Group>
                <FloatButton icon={<SettingOutlined />} onClick={() => dispatch(showSettingsModal())} />
                <FloatButton icon={<PlusOutlined />} onClick={() => dispatch(showCreateTaskModal())} />
            </FloatButton.Group>

            {groupedTasks ? <CollapsableTasks /> : <Tasks />}
        </>
    )
}
import SettingsModal from "../../shared/features/settings/ui/SettingsModal";
import CreateTaskModal from "./ui/CreateTaskModal";
import { FloatButton } from "antd";
import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
import { useState } from "react";
import useSettings from "../../shared/features/settings/hooks/useSettings";
import CollapsableTasks from "./ui/CollapsableTasks";
import Tasks from "./ui/Tasks";

export default function TodoPage() {
    const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [groupedTasks] = useSettings<boolean>("groupedTasks");

    return (
        <>
            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
            <CreateTaskModal isOpen={isCreateTaskModalOpen} onClose={() => setIsCreateTaskModalOpen(false)} />
            <FloatButton.Group>
                <FloatButton icon={<SettingOutlined />} onClick={() => setIsSettingsOpen(true)} />
                <FloatButton icon={<PlusOutlined />} onClick={() => setIsCreateTaskModalOpen(true)} />
            </FloatButton.Group>
            
            {groupedTasks ? <CollapsableTasks/> : <Tasks/>}
        </>
    )
}
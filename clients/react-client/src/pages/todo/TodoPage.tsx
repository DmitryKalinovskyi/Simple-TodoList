import FloatButtonGroup from "antd/es/float-button/FloatButtonGroup";
import SettingsModal from "../../shared/features/settings/ui/SettingsModal";
import CreateTaskModal from "./ui/CreateTaskModal";
import TaskList from "./ui/TaskList";
import { FloatButton } from "antd";
import { PlusOutlined, SettingOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function TodoPage() {
    const [isCreateTaskModalOpen, setIsCreateTaskModalOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <>
            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)}/>
            <CreateTaskModal isOpen={isCreateTaskModalOpen} onClose={() => setIsCreateTaskModalOpen(false)} />
            <FloatButton.Group>
                <FloatButton icon={<SettingOutlined />} onClick={() => setIsSettingsOpen(true)} />
                <FloatButton icon={<PlusOutlined />} onClick={() => setIsCreateTaskModalOpen(true)} />
            </FloatButton.Group>

            <div className="container mt-5">
                <TaskList />
            </div>
        </>
    )
}
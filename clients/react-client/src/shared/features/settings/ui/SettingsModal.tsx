import { useDispatch, useSelector } from "react-redux";
import { getEnumKeys } from "../../../extension/getEnumKeys";
import { closeSettingsModal, StorageType } from "../state/settingsSlice";
import { ColorPicker, List, Modal, Select, Switch, Typography } from "antd";
import { TodoListRootState } from "../../../../state/store";
import useSettings from "../hooks/useSettings";

export default function SettingsModal() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: TodoListRootState) => state.settings.isSettingsModalOpen);

    const [settings, setSetting] = useSettings();

    const close = () => {
        dispatch(closeSettingsModal());
    }

    return (
        <>
            <Modal title="Settings" open={isOpen} onCancel={close} onOk={close}>
                <List>
                    <List.Item>
                        <Typography.Text>
                            Storage type
                        </Typography.Text>
                        <Select
                            style={{ width: "150px" }}
                            onChange={(value: StorageType) => setSetting("storageType", value)}
                            value={settings.storageType}
                            options={getEnumKeys(StorageType).map((key) =>
                                ({ value: key, label: key })
                            )} />
                    </List.Item>
                    <List.Item>
                        <Typography.Text>
                            Display completed
                        </Typography.Text>
                        <Switch value={settings.displayCompleted} onChange={(checked) => setSetting("displayCompleted", checked)} />
                    </List.Item>
                    <List.Item>
                        <Typography.Text>
                            Dark theme
                        </Typography.Text>
                        <Switch value={settings.darkTheme} onChange={(checked) => setSetting("darkTheme", checked)}/>
                    </List.Item>
                    <List.Item>
                        <Typography.Text>
                            Grouped tasks
                        </Typography.Text>
                        <Switch value={settings.groupedTasks} onChange={(checked) => setSetting("groupedTasks", checked)}/>
                    </List.Item>
                    <List.Item>
                        <Typography.Text>
                            Primary accent
                        </Typography.Text>
                        <ColorPicker value={settings.primaryColor} onChange={(value) => setSetting("primaryColor", value.toHex())}/>
                    </List.Item>
                </List>
            </Modal>
        </>
    )
}
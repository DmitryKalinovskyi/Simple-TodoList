import { getEnumKeys } from "../../../extension/getEnumKeys";
import useSettings from "../hooks/useSettings";
import { StorageType } from "../state/settingsSlice";
import { List, Modal, Select, Switch, Typography } from "antd";

interface SettingsModalProps {
    isOpen: boolean,
    onClose: () => void
}

export default function SettingsModal(props: SettingsModalProps) {
    const [storageType, setStorageType] = useSettings<StorageType>("storageType");
    const [displayCompleted, setDisplayCompleted] = useSettings<boolean>("displayCompleted");

    const handleStorageTypeSelect = (value: string) => {
        if (value in StorageType) {
            setStorageType(value as StorageType);
        }
    }
    const handleDisplayCompletedChange = (checked: boolean) => {
        setDisplayCompleted(checked);
    }

    const handleClose = () => {
        props.onClose();
    }

    return (
        <>
            <Modal title="Settings" open={props.isOpen} onCancel={handleClose} onOk={handleClose}>
                <List>
                    <List.Item>
                        <Typography.Text>
                            Storage type:
                        </Typography.Text>
                        <Select
                            style={{ width: "150px" }}
                            onChange={handleStorageTypeSelect}
                            value={storageType}
                            options={getEnumKeys(StorageType).map((key) =>
                                ({ value: key, label: key })
                            )} />
                    </List.Item>
                    <List.Item>
                        <Typography.Text>
                            Display completed:
                        </Typography.Text>
                        <Switch value={displayCompleted} onChange={handleDisplayCompletedChange} />
                    </List.Item>
                    {/* <div className="row align-items-center">
                                    <button className="btn btn-primary col-auto" data-bs-dismiss="modal" onClick={handleSave}>Save</button>
                                    </div> */}
                </List>
            </Modal>
        </>
    )
}
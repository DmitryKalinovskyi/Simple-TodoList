import { Modal, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { TodoListRootState } from "../../../state/store"
import { closeCalendarDayModal } from "../../../shared/features/schedule/state/scheduleSlice";
import TaskList from "../../../shared/features/todo/ui/TaskList";
import dayjs from "dayjs";
import useTasks from "../../../shared/features/todo/hooks/useTasks";
import { PlusOutlined } from "@ant-design/icons";
import { showCreateTaskModal } from "../../../shared/features/todo/state/tasksSlice";

export default function CalendarDayModal() {
    const dispatch = useDispatch();
    const isOpen = useSelector((state: TodoListRootState) => state.schedule.isCalendarDayModalOpen);
    const selectedDay = useSelector((state: TodoListRootState) => state.schedule.selectedDay);
    const tasks = useTasks()
        .filter(task => task.deadline && dayjs(task.deadline).isSame(selectedDay, "day"));

    const close = () => {
        dispatch(closeCalendarDayModal());
    }

    return <>
        <Modal title={`Tasks for ${selectedDay?.format("DD-MM-YYYY")}`}
            open={isOpen}
            onCancel={close}
            width={1000}
            centered
            styles={{
                body: {
                    height: "400px",
                    overflowY: "auto"
                },
                footer: {
                    display: 'flex',
                    justifyContent: "end"
                }
            }}
            footer={[
                <Button type="primary" key="create" onClick={() => dispatch(showCreateTaskModal({initialDeadline: selectedDay.endOf('day')}))}>
                    <PlusOutlined/>
                </Button>,
                <Button type="primary" key="ok" onClick={close}>
                    Ok
                </Button>,
            ]}
        >
            <TaskList tasks={tasks} />
        </Modal>
    </>
}
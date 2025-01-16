import { Badge, Button, Calendar, Flex, FloatButton } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { setToday, nextMonth, previousMonth, showCalendarDayModal } from "../../shared/features/schedule/state/scheduleSlice";
import CalendarDayModal from "./ui/CalendarDayModal";
import UpdateTaskModal from "../../shared/features/todo/ui/UpdateTaskModal";
import CreateTaskModal from "../../shared/features/todo/ui/CreateTaskModal";
import { SettingOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import { showSettingsModal } from "../../shared/features/settings/state/settingsSlice";
import SettingsModal from "../../shared/features/settings/ui/SettingsModal";
import useTasks from "../../shared/features/todo/hooks/useTasks";
import { TodoListRootState } from "../../state/store";

function textDecorator(text: string) {
    const len = 20;
    if (text.length >= len) {
        return `${text.slice(0, len - 3)}...`;
    }
    return text;
}

export default function SchedulePage() {
    const dispatch = useDispatch();
    const tasks = useTasks();
    const selectedDay = useSelector((state: TodoListRootState) => state.schedule.selectedDay);

    const handleMonthClick = (date: Dayjs) => {
        dispatch(showCalendarDayModal(date));
    }

    return <div style={{ height: "100%", overflow: "auto", padding: "4px" }}>
        <CalendarDayModal />
        <SettingsModal />
        <CreateTaskModal />
        <UpdateTaskModal />
        <FloatButton.Group>
            <FloatButton icon={<SettingOutlined />} onClick={() => dispatch(showSettingsModal())} />
            {/* <FloatButton icon={<PlusOutlined />} onClick={() => dispatch(showCreateTaskModal())} /> */}
        </FloatButton.Group>
        <Calendar
            onSelect={(date) => handleMonthClick(date)}
            value={selectedDay}
            headerRender={(renderProperties) => {
                return <Flex gap={4} align="center">
                    <Button onClick={() => dispatch(setToday())}>Today</Button>
                    <Button type="text" onClick={() => dispatch(previousMonth())}><LeftOutlined /></Button>
                    <Button type="text" onClick={() => dispatch(nextMonth())}><RightOutlined /></Button>
                    <div>
                        {renderProperties.value.format("MMMM YYYY")}
                    </div>
                </Flex>
            }}
            cellRender={(date: Dayjs) => {
                return <div style={{ height: "100%", overflow: "hidden" }}>
                        {tasks
                            .filter(task => task.deadline && dayjs(task.deadline).isSame(date, "day"))
                            .map(task => {
                                return <div>
                                    <Badge key={task.id} status={task.isCompleted ? "success" : "processing"} text={textDecorator(task.name)} />
                                    </div>
                            })}
                </div>
            }} />
    </div>
}
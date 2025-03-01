import { useSelector } from "react-redux"
import { TodoListRootState } from "../../../state/store"
import dayjs from "dayjs";
import { Card, Empty, Flex, Progress, Tooltip, Typography } from "antd";

export default function CompletedTodayCard() {
    const todayTasks = useSelector((state: TodoListRootState) => state.tasks.tasks)
        .filter(task => dayjs(task.deadline).isSame(dayjs(), 'day'));

    if(todayTasks.length == 0){
        return <Empty></Empty>
    }
    const completedCount = todayTasks.filter(task => task.isCompleted).length;
    const complitionPercent = Math.floor(completedCount / todayTasks.length * 100);

    return <>
        <Flex vertical align="center" gap={10}>
            <Tooltip title={`${completedCount}/${todayTasks.length} done`}>
                <Progress size={200} type="circle" percent={complitionPercent} />
            </Tooltip>
            <Flex vertical align="center">
                <Typography.Title>
                    Good job!
                </Typography.Title>
                <Typography.Text>
                    You almost made it, this is your progress today
                </Typography.Text>
            </Flex>
        </Flex>
    </>
}
import Task from "../../../models/Task.ts";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { deleteTask, updateTask } from "../state/tasksSlice.ts";
import { Button, Checkbox, Flex, Tag, Typography } from "antd";
import { DeleteFilled } from "@ant-design/icons";

const { Text } = Typography;

interface TaskRowProps {
    task: Task,
    onComplete?: (id: number) => void;
    onDelete?: (id: number) => void;
}

export default function TaskCard(props: TaskRowProps) {
    const task = props.task;
    const dispatch = useDispatch();

    function toggleTodo() {
        dispatch(updateTask(
            {
                id: task.id,
                task: {
                    isCompleted: !task.isCompleted
                }
            }));
    }

    return (
        <Flex justify={"space-between"} align={"center"} style={{ width: "100%" }}>
            <div>
                <Checkbox onChange={toggleTodo}
                    checked={task.isCompleted}
                    style={{ marginRight: "8px" }}
                >
                    <Flex gap={30} align={"center"}> 
                        <Flex vertical align={"flex-start"}>
                            {/* use key to invoke reconcillation and rerender text*/}
                            <Text delete={task.isCompleted} key={+task.isCompleted}>
                                {task.name}
                            </Text>
                            {task.deadline && <Text type={"danger"}>
                                {dayjs(task.deadline).format("MMMM D, YYYY h:mm A")}
                            </Text>}
                        </Flex>
                        <div>
                            {task.category && <Tag color="blue">
                                {task.category.name}
                            </Tag>}
                        </div>
                    </Flex>
                </Checkbox>

            </div>
            <div>
                <Button variant="solid" color="red" onClick={() => dispatch(deleteTask(task.id))}>
                    <DeleteFilled />
                </Button>
            </div>
        </Flex>
    )
}
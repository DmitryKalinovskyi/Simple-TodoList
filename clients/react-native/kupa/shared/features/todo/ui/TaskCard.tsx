import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import Task from "../../../../models/Task";
import { updateTask, deleteTask, showUpdateTaskModal } from "../state/tasksSlice";
import { View } from "react-native";

interface TaskRowProps {
    task: Task,
    onComplete?: (id: number) => void;
    onDelete?: (id: number) => void;
}

export default function TaskCard(props: TaskRowProps) {
    const task = props.task;
    const dispatch = useDispatch();

    function toggleTodo() {
        dispatch(updateTask({
            id: task.id,
            isCompleted: !task.isCompleted
        }));
    }

    return <View>
        
    </View>
    // return (
    //     <Flex justify={"space-between"} align={"center"} style={{ width: "100%" }}>
    //         <div>
    //             <Checkbox onChange={toggleTodo}
    //                 checked={task.isCompleted}
    //                 style={{ marginRight: "8px" }}
    //             >
    //                 <Flex gap={30} align={"center"}>
    //                     <Flex vertical align={"flex-start"}>
    //                         {/* use key to invoke reconcillation and rerender text*/}
    //                         <Text delete={task.isCompleted} key={+task.isCompleted}>
    //                             {task.name}
    //                         </Text>
    //                         {task.deadline && <Text type={"danger"}>
    //                             {dayjs(task.deadline).format("MMMM D, YYYY h:mm A")}
    //                         </Text>}
    //                     </Flex>
    //                     {task.category && <Tag color="blue">
    //                         {task.category.name}
    //                     </Tag>}
    //                 </Flex>
    //             </Checkbox>
    //         </div>
    //         <div>
    //             <Button type={"text"} onClick={() => dispatch(showUpdateTaskModal(task))}>
    //                 <EditFilled />
    //             </Button>
    //             <Button danger type={"text"} onClick={() => dispatch(deleteTask(task.id))}>
    //                 <DeleteFilled />
    //             </Button>
    //         </div>
    //     </Flex>
    // )
}
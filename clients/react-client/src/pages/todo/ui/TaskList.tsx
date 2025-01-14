import TaskCard from "./TaskCard.tsx";
import useTasks from "../hooks/useTasks.ts";
import { List } from "antd";


export default function TaskList(){
    const tasks = useTasks();

    return (
        <List itemLayout="horizontal"
        dataSource={tasks}
        renderItem={(task) =>
            <List.Item>
                <TaskCard task={task} key={task.id}/>
            </List.Item>
        }
        />
    )
}
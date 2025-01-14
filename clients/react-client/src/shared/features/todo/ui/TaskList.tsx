import Task from "../../../../models/Task.ts";
import TaskCard from "./TaskCard.tsx";
import { List } from "antd";

interface TaskListProps{
    tasks: Task[]
}

export default function TaskList(props: TaskListProps){
    return (
        <List itemLayout="horizontal"
        dataSource={props.tasks}
        style={{width: "100%"}}
        
        renderItem={(task) =>
            <List.Item>
                <TaskCard task={task} key={task.id}/>
            </List.Item>
        }
        />
    )
}
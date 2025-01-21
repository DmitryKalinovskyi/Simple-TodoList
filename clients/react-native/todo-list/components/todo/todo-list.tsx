import Task from "@/lib/models/Task";
import { apiDeleteTask, showUpdateTaskModal, apiUpdateTask } from "@/lib/shared/features/todo/state/tasksSlice";
import { AntDesign } from "@expo/vector-icons";
import { Button, CheckBox, Divider, Icon, List, ListItem, Text } from "@ui-kitten/components";
import { ComponentProps } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import TodoListItem from "./todo-list-item";

interface TodoListProps<Item> extends Omit<ComponentProps<typeof List<number>>, 
"data" | "renderItem"> {
    taskIds: number[];
}


export default function TodoList({ taskIds, ...rest }: TodoListProps<Task>) {
    return <List<number>
        style={{ width: "100%" }}
        data={taskIds}
        ItemSeparatorComponent={Divider}
        renderItem={(info) => <TodoListItem taskId={info.item}/>}
        {...rest}
    />
}
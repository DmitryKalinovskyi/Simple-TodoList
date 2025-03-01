import { apiUpdateTask, showUpdateTaskModal, apiDeleteTask } from "@/lib/shared/features/todo/state/tasksSlice";
import { TodoListRootState } from "@/lib/shared/state/store";
import { AntDesign } from "@expo/vector-icons";
import { ListItem, CheckBox, Button } from "@ui-kitten/components";
import { ListRenderItemInfo } from "react-native";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

interface TodoListItemProps {
    taskId: number
}

export default function TodoListItem(props: TodoListItemProps) {
    const dispatch = useDispatch();
    const task = useSelector((state: TodoListRootState) => state.tasks.tasks.find(task => task.id == props.taskId));
    if (task === undefined) {
        return null;
    }

    const toggleTodo = () => {
        dispatch(apiUpdateTask({ id: task.id, isCompleted: !task.isCompleted }));
    }

    return <ListItem
        key={task.id}
        title={task.name}
        onPress={toggleTodo}
        description={task.deadline ? dayjs(task.deadline).format("dddd, MMMM D YYYY [at] h:mm A"): undefined}
        accessoryLeft={() => <View>
            <CheckBox
                onChange={toggleTodo}
                checked={task.isCompleted} />
        </View>}
        accessoryRight={() => <View style={{ flexDirection: "row", gap: 10 }}>
            <Button appearance="ghost" onPress={() => dispatch(showUpdateTaskModal(task))}>
                <AntDesign name={"edit"} />
            </Button>
            <Button appearance="ghost" status="danger" onPress={() => dispatch(apiDeleteTask(task.id))}>
                <AntDesign name={"delete"} />
            </Button>
        </View>}
    />
}
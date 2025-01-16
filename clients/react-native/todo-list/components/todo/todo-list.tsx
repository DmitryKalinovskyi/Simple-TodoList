import Task from "@/lib/models/Task";
import { deleteTask, showUpdateTaskModal, updateTask } from "@/lib/shared/features/todo/state/tasksSlice";
import { AntDesign } from "@expo/vector-icons";
import { Button, CheckBox, Divider, Icon, List, ListItem, Text } from "@ui-kitten/components";
import { ComponentProps } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";

interface TodoListProps<Item> extends Omit<ComponentProps<typeof List<Item>>, 
"data" | "renderItem"> {
    tasks: Task[];
}


export default function TodoList({ tasks, ...rest }: TodoListProps<Task>) {
    const dispatch = useDispatch();

    return <List<Task>
        style={{ width: "100%" }}
        data={tasks}
        ItemSeparatorComponent={Divider}
        renderItem={(info) =>
            <ListItem
                key={info.item.id}
                title={info.item.name}
                description={info.item.deadline}
                accessoryLeft={() => <View>
                    <CheckBox
                        onChange={(checked) => dispatch(updateTask({ id: info.item.id, isCompleted: checked }))}
                        checked={info.item.isCompleted} />
                </View>}
                accessoryRight={() => <View style={{ flexDirection: "row", gap: 10 }}>
                    <Button appearance="ghost" onPress={() => dispatch(showUpdateTaskModal(info.item))}>
                        <AntDesign name={"edit"} />
                    </Button>
                    <Button appearance="ghost" status="danger" onPress={() => dispatch(deleteTask(info.item.id))}>
                        <AntDesign name={"delete"} />
                    </Button>
                </View>}
            />
        }
        {...rest}
    />
}
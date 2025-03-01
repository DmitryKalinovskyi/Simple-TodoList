import { Text, View } from "react-native";
import Task from "../../../../models/Task.ts";
import { Divider, List, ListItem } from '@ui-kitten/components';

interface TaskListProps {
    tasks: Task[]
}

export default function TaskList(props: TaskListProps) {
    return <View>
        {/* {props.tasks.map(task => <View key={task.id}>
            <Text>{task.name}</Text> */}
        <List
            data={props.tasks}
            ItemSeparatorComponent={Divider}
            renderItem={(info) => {
                return <ListItem title={info.item.name} />
            }}
        />
    </View>
}
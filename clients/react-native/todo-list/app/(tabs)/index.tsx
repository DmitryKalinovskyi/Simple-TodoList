import FloatButton from "@/components/shared/float-button";
import TodoList from "@/components/todo/todo-list";
import useTasks from "@/lib/shared/features/todo/hooks/useTasks";
import { showCreateTaskModal } from "@/lib/shared/features/todo/state/tasksSlice";
import { TodoListRootState } from "@/lib/shared/state/store";
import { AntDesign } from "@expo/vector-icons";
import { Layout } from "@ui-kitten/components";
import { SafeAreaView, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function TodoScreen() {
    const dispatch = useDispatch();
    const tasks = useTasks();
    return <SafeAreaView style={{ flex: 1 }}>
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TodoList tasks={tasks} ListFooterComponent={<View style={{ height: 80 }} />}/>
        </Layout>
        <FloatButton onPress={() => dispatch(showCreateTaskModal())}
            attached="bottom"
            style={{ borderRadius: 32 }}>
            <AntDesign name={"plus"} />
        </FloatButton>
    </SafeAreaView>
}
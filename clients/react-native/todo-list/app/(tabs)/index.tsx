import Fade from "@/components/animations/Fade";
import FloatButton from "@/components/shared/float-button";
import TodoList from "@/components/todo/todo-list";
import useTasks from "@/lib/shared/features/todo/hooks/useTasks";
import { showCreateTaskModal } from "@/lib/shared/features/todo/state/tasksSlice";
import { TodoListRootState } from "@/lib/shared/state/store";
import { AntDesign } from "@expo/vector-icons";
import { createSelector } from "@reduxjs/toolkit";
import { Icon, Layout, Spinner, useTheme } from "@ui-kitten/components";
import { useEffect } from "react";
import { SafeAreaView, View } from "react-native";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

// Memoized selector for task IDs
const selectTaskIds = createSelector(
    (state: TodoListRootState) => state.tasks.tasks,
    (tasks) => tasks.map((task) => task.id)
);

export default function TodoScreen() {
    const dispatch = useDispatch();
    const theme = useTheme();
    const taskIds = useSelector(selectTaskIds, shallowEqual);
    const isTasksFetching = useSelector((state: TodoListRootState) => state.tasks.isFetching);

    return <SafeAreaView style={{ flex: 1 }}>
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {isTasksFetching ?
                <Spinner />
                :
                <TodoList taskIds={taskIds} ListFooterComponent={<View style={{ height: 80 }} />} />
            }
        </Layout>
        <FloatButton onPress={() => dispatch(showCreateTaskModal())}
            attached="bottom"
            style={{
                borderRadius: 32,
                width: 64,
                height: 64,
            }}
        >
            <Icon name={"plus"} width={32} height={32} fill={theme["background-basic-color-1"]} />
        </FloatButton>
    </SafeAreaView>
}
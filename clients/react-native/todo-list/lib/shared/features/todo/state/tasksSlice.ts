import CreateTaskInput from "@/lib/models/CreateTaskInput";
import Task from "@/lib/models/Task";
import UpdateTaskInput from "@/lib/models/UpdateTaskInput";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TaskDictionary = { [key: number]: Task | undefined };

interface TasksState {
    isFetching: boolean;
    tasks: Task[];
    operationTask: Task | null;
    isUpdateTaskModalOpen: boolean;
    isCreateTaskModalOpen: boolean;
    createTaskModalInitial: {
        name: string;
        categoryId?: number;
        deadline?: Date;
    };

    persistedToUpdate: TaskDictionary;
    persistedToDelete: TaskDictionary;
}

const initialState: TasksState = {
    isFetching: false,
    tasks: [],
    operationTask: null,
    isUpdateTaskModalOpen: false,
    isCreateTaskModalOpen: false,
    createTaskModalInitial: {
        name: "",
    },
    persistedToUpdate: {},
    persistedToDelete: {},
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            if(!state.tasks.includes(action.payload)){
                state.tasks.push(action.payload);
            }
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            state.tasks = state.tasks.map(task => task.id == action.payload.id ? action.payload : task);
        },
        removeTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(task => task.id != action.payload);
        },

        fetchTasks: (state) => {
            state.isFetching = true;
        },
        fetchTasksSuccess: (state, action: PayloadAction<Task[]>) => {
            state.tasks = [...action.payload];
            state.isFetching = false;
        },
        fetchTasksFailure: (state) => {
            state.isFetching = false;
        },

        apiCreateTask: (state, action: PayloadAction<CreateTaskInput>) => {
            state.tasks.push({
                id: action.payload.id,
                name: action.payload.name,
                deadline: action.payload.deadline,
                isCompleted: action.payload.isCompleted,
                // TODO: resolve category :think:
            });
        },

        apiCreateTaskSuccess: (
            state,
            action: PayloadAction<{ input: CreateTaskInput; task: Task }>
        ) => {
            state.tasks = state.tasks.map((task) =>
                task.id == action.payload.input.id
                    ? {
                          ...task,
                          id: action.payload.task.id,
                          category: action.payload.task.category,
                      }
                    : task
            );
        },

        apiCreateTaskFailure: (
            state,
            action: PayloadAction<CreateTaskInput>
        ) => {
            state.tasks = state.tasks.filter(
                (task) => task.id != action.payload.id
            );
        },

        apiUpdateTask: (state, action: PayloadAction<UpdateTaskInput>) => {
            const task = state.tasks.find(
                (task) => task.id == action.payload.id
            );

            if (task) {
                state.persistedToUpdate[task.id] = task;
                state.tasks = state.tasks.map((task) =>
                    task.id == action.payload.id
                        ? ({ ...task, ...action.payload } as Task)
                        : task
                );
            }
        },
        apiUpdateTaskSuccess: (
            state,
            action: PayloadAction<{ input: UpdateTaskInput; task: Task }>
        ) => {
            state.persistedToUpdate[action.payload.input.id] = undefined;
        },
        apiUpdateTaskFailure: (
            state,
            action: PayloadAction<UpdateTaskInput>
        ) => {
            if (state.persistedToUpdate[action.payload.id]) {
                // replace to old version and clear cache
                state.tasks = state.tasks.map((task) =>
                    task.id == action.payload.id
                        ? (state.persistedToUpdate[action.payload.id] as Task)
                        : task
                );
                state.persistedToUpdate[action.payload.id] = undefined;
            }
        },

        apiDeleteTask: (state, action: PayloadAction<number>) => {
            const task = state.tasks.find((task) => task.id == action.payload);
            if (task) {
                // persist task to revert delete on failure
                state.persistedToDelete[task.id] = task;
                state.tasks = state.tasks.filter(
                    (task) => task.id != action.payload
                );
            }
        },
        apiDeleteTaskSuccess: (state, action: PayloadAction<number>) => {
            // clear persisted task
            state.persistedToDelete[action.payload] = undefined;
        },
        apiDeleteTaskFailure: (state, action: PayloadAction<number>) => {
            if (state.persistedToDelete[action.payload]) {
                state.tasks.push(
                    state.persistedToDelete[action.payload] as Task
                );
                state.persistedToDelete[action.payload] = undefined;
            }
        },

        showUpdateTaskModal: (state, action: PayloadAction<Task>) => {
            state.operationTask = action.payload;
            state.isUpdateTaskModalOpen = true;
        },
        closeUpdateTaskModal: (state) => {
            state.operationTask = null;
            state.isUpdateTaskModalOpen = false;
        },

        showCreateTaskModal: (
            state,
            action: PayloadAction<undefined | { initialDeadline: Date }>
        ) => {
            state.isCreateTaskModalOpen = true;
            if (action.payload) {
                state.createTaskModalInitial.deadline =
                    action.payload.initialDeadline;
            } else {
                state.createTaskModalInitial = { name: "" };
            }
        },
        closeCreateTaskModal: (state) => {
            state.isCreateTaskModalOpen = false;
        },
    },
});

export const {
    addTask,
    updateTask,
    removeTask,
    
    fetchTasks,
    fetchTasksSuccess,
    fetchTasksFailure,

    apiCreateTask,
    apiCreateTaskSuccess,
    apiCreateTaskFailure,

    apiUpdateTask,
    apiUpdateTaskSuccess,
    apiUpdateTaskFailure,

    apiDeleteTask,
    apiDeleteTaskSuccess,
    apiDeleteTaskFailure,

    showUpdateTaskModal,
    closeUpdateTaskModal,

    showCreateTaskModal,
    closeCreateTaskModal,
} = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;

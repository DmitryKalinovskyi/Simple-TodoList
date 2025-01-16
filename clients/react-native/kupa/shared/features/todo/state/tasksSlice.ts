import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import Task from "../../../../models/Task";
import { Dayjs } from "dayjs";
import CreateTaskInput from "@/models/CreateTaskInput";
import UpdateTaskInput from "@/models/UpdateTaskInput";

interface TasksState{
    tasks: Task[],
    operationTask: Task | null,
    isUpdateTaskModalOpen: boolean,
    isCreateTaskModalOpen: boolean,
    createTaskModalInitial: {
        name: string,
        categoryId?: number,
        deadline?: Dayjs,
    }
}

const initialState: TasksState = {
    tasks: [],
    operationTask: null,
    isUpdateTaskModalOpen: false,
    isCreateTaskModalOpen: false,
    createTaskModalInitial: {
        name: ""
    }
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        fetchTasks: () => {},
        fetchTasksSuccess: (state, action: PayloadAction<Task[]>) => {
            state.tasks = [...action.payload];
        },
        fetchTasksFailure: () => {

        },
        
        createTask: (state, action: PayloadAction<CreateTaskInput>) => {},
        createTaskSuccess: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        createTaskFailure: (state) => {
        },

        deleteTask: (state, action: PayloadAction<number>) => {},
        deleteTaskSuccess: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(task => task.id != action.payload)
        },
        deleteTaskFailure: () => {},

        updateTask: (state, action: PayloadAction<UpdateTaskInput>) => {},
        updateTaskSuccess: (state, action: PayloadAction<Task>) => {
            // find and populate fields.
            state.tasks = state.tasks.map(task => {
                if(task.id == action.payload.id){
                   return {...task, ...action.payload};
                }

                return task;
            })
        },
        updateTaskFailure: () => {},

        showUpdateTaskModal: (state, action: PayloadAction<Task>) => {
            state.operationTask = action.payload;
            state.isUpdateTaskModalOpen = true;
        },   
        closeUpdateTaskModal: (state) => {
            state.operationTask = null;
            state.isUpdateTaskModalOpen = false;
        },

        showCreateTaskModal: (state, action: PayloadAction<undefined | {initialDeadline: Dayjs}>) => {
            state.isCreateTaskModalOpen = true;
            if(action.payload){
                state.createTaskModalInitial.deadline = action.payload.initialDeadline;
            }
            else{
                state.createTaskModalInitial = {name: ""}
            }
        },
        closeCreateTaskModal: (state) => {
            state.isCreateTaskModalOpen = false;
        }
    }
});

export const { 
    fetchTasks,
    fetchTasksSuccess,
    fetchTasksFailure,

    createTask,
    createTaskSuccess,
    createTaskFailure,

    updateTask,
    updateTaskSuccess,
    updateTaskFailure,

    deleteTask,
    deleteTaskSuccess,
    deleteTaskFailure,

    showUpdateTaskModal,
    closeUpdateTaskModal,

    showCreateTaskModal,
    closeCreateTaskModal,
} = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
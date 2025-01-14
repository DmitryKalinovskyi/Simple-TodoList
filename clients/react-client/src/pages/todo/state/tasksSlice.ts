import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import Task from "../../../models/Task";
import { UpdateTaskInput } from "../../../models/UpdateTaskInput";
import { CreateTaskInput } from "../../../models/CreateTaskInput";

interface TasksState{
    tasks: Task[]
}

const initialState: TasksState = {
    tasks: []
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
        updateTaskSuccess: (state, action: PayloadAction<UpdateTaskInput>) => {
            // find and populate fields.
            state.tasks = state.tasks.map(task => {
                if(task.id == action.payload.id){
                    // we will rewrite fields
                    return {...task, ...action.payload.task};
                }
                return task;
            })
        },
        updateTaskFailure: () => {},

        change_complition: (state, action: PayloadAction<number>) => {
            state.tasks.map(task => {
                if(task.id == action.payload) task.isCompleted = !task.isCompleted;
            });
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

    change_complition
} = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
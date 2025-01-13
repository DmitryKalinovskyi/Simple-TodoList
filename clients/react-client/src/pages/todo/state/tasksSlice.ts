import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import Task from "../../../models/Task";
import { UpdateTaskInput } from "../../../models/UpdateTaskInput";

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
        set_tasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = [...action.payload];
        },
        add_tasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = [...state.tasks, ...action.payload];
        },
        add_task: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        remove_task: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(task => task.id != action.payload)
        },
        update_task: (state, action: PayloadAction<UpdateTaskInput>) => {
            // find and populate fields.
            state.tasks = state.tasks.map(task => {
                if(task.id == action.payload.id){
                    // we will rewrite fields
                    return {...task, ...action.payload.task};
                }
                return task;
            })
        },
        change_complition: (state, action: PayloadAction<number>) => {
            state.tasks.map(task => {
                if(task.id == action.payload) task.isCompleted = !task.isCompleted;
            });
        }
    }
});

export const {
    set_tasks,
    add_tasks,
    add_task,
    remove_task,
    update_task,
    change_complition
} = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
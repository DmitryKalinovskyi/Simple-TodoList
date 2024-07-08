import Task from "../models/Task.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface TasksState{
    tasks: Task[]
}

const initialState: TasksState = {tasks: []};

let task_id = 0;

const tasksSlice = createSlice({
        name: "tasks",
        initialState,
        reducers: {
            add_task: (state, action: PayloadAction<Task>) => {
                action.payload.id = task_id;
                task_id++;
                state.tasks.push(action.payload);
            },
            remove_task: (state, action: PayloadAction<number>) => {
                state.tasks = state.tasks.filter(task => task.id != action.payload)
            },
            change_complition: (state, action: PayloadAction<number>) => {
                state.tasks.forEach(task => {
                    if(task.id == action.payload) task.isCompleted = !task.isCompleted;
                })
            }
        }
    });

export const {add_task, remove_task, change_complition} = tasksSlice.actions;

export default tasksSlice.reducer;
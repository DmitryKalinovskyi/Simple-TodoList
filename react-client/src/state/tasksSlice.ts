import Task from "../models/Task.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { UpdateTaskInput } from "../models/UpdateTaskInput.ts";

interface TasksState{
    tasks: Task[]
}

// so the initial state is just load from the api all tasks.
// const initialState: TasksState = {tasks: []};
// const result = (await client.query({
//     query: TASKS_QUERY,
//     variables: {}
// }));

const initialState: TasksState = {
    tasks: []
};

// let task_id = -1;

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
            // while updating local state, we update the actual data using api

            // assign temp id
            // action.payload.id = task_id;
            // task_id--;

            state.tasks.push(action.payload);
            // const response = await client.mutate({
            //     mutation: CREATE_TASK,
            //     variables: {
            //         task: {
            //             name: action.payload.name,
            //             deadline: action.payload.deadline,
            //             categoryId: action.payload.category?.id,
            //         }}
            // }
            // );
            //
            // console.log(response.data);
            // const id = response.data.taskMutation.createTask.id;
            // console.log(id);
            //
            // state.tasks
            //     .filter(task => task.id == action.payload.id)
            //     .forEach(task => task.id = id);

        },
        remove_task: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(task => task.id != action.payload)
            // make request to the api
                // query: DELETE_TASK,
            // client.mutate({
            //     mutation: DELETE_TASK,
            //     variables: {id: +action.payload}
            // })
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
            // state.tasks.forEach(task => {
            //     if(task.id == action.payload) task.isCompleted = !task.isCompleted;
            // })
            //
            // const task: Task = {...state.tasks
            //     .filter(task => task.id == action.payload)[0]};
            //
            // // we can omit fields, that we don't update.
            // client.mutate({
            //     mutation: UPDATE_TASK,
            //     variables: {id: action.payload, task: {
            //             isCompleted: task.isCompleted,
            //         }}
            // })
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

export default tasksSlice.reducer;
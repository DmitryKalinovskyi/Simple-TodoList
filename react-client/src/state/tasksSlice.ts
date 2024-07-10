import Task from "../models/Task.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {client} from "../api/client.ts";
import {CREATE_TASK, DELETE_TASK, TASKS_QUERY, UPDATE_TASK} from "../api/tasksRequests.ts";

interface TasksState{
    tasks: Task[]
}

// so the initial state is just load from the api all tasks.
// const initialState: TasksState = {tasks: []};
const result = (await client.query({
    query: TASKS_QUERY,
    variables: {}
}));

console.log(result);
const tasks = result.data.taskQuery.tasks;

const initialState: TasksState = {
    tasks
};

let task_id = 0;

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        add_task: (state, action: PayloadAction<Task>) => {
            // while updating local state, we update the actual data using api

            // assign temp id
            action.payload.id = task_id;
            task_id++;
            state.tasks.push(action.payload);
            console.log(action.payload);
            // client.mutate({
            //     mutation: CREATE_TASK,
            //     variables: {task: action.payload}
            // }
            // )
        },
        remove_task: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(task => task.id != action.payload)
            // make request to the api
                // query: DELETE_TASK,
            client.mutate({
                mutation: DELETE_TASK,
                variables: {id: +action.payload}
            })
        },
        change_complition: (state, action: PayloadAction<number>) => {
            state.tasks.forEach(task => {
                if(task.id == action.payload) task.isCompleted = !task.isCompleted;
            })

            const task: Task = {...state.tasks
                .filter(task => task.id == action.payload)[0]};

            // we can omit fields, that we don't update.
            client.mutate({
                mutation: UPDATE_TASK,
                variables: {id: action.payload, task: {
                        isCompleted: task.isCompleted,
                    }}
            })
        }
    }
});

//
// const tasksSlice = createSlice({
//         name: "tasks",
//         initialState,
//         reducers: {
//             add_task: (state, action: PayloadAction<Task>) => {
//                 action.payload.id = task_id;
//                 task_id++;
//                 state.tasks.push(action.payload);
//             },
//             remove_task: (state, action: PayloadAction<number>) => {
//                 state.tasks = state.tasks.filter(task => task.id != action.payload)
//             },
//             change_complition: (state, action: PayloadAction<number>) => {
//                 state.tasks.forEach(task => {
//                     if(task.id == action.payload) task.isCompleted = !task.isCompleted;
//                 })
//             }
//         }
//     });

export const {add_task, remove_task, change_complition} = tasksSlice.actions;

export default tasksSlice.reducer;
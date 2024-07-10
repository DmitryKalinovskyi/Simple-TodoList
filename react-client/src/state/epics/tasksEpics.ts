import {ofType} from "redux-observable";
import {catchError, from, map, mergeMap, of, tap} from "rxjs";
import {client} from "../../api/client.ts";
import {CREATE_TASK, DELETE_TASK, TASKS_QUERY, UPDATE_TASK} from "../../api/tasksRequests.ts";
import {add_task, remove_task, set_tasks, update_task, UpdateTaskInput} from "../tasksSlice.ts";
import {PayloadAction} from "@reduxjs/toolkit";
import {CreateTaskInput} from "../../models/CreateTaskInput.ts";

// fetch tasks action creator
export const fetch_tasks = () => ({type: "FETCH_TASKS"});
export const fetchTasksEpic = action$ => action$.pipe(
    ofType("FETCH_TASKS"),
    mergeMap(() =>
        from(client.query({
            query: TASKS_QUERY,
            variables: {}
        })).pipe(
            map(response => set_tasks(response.data.taskQuery.tasks))
        )
    )
);

export const add_task_request = (payload: CreateTaskInput) => ({type: "ADD_TASK_REQUEST", payload});
export const addTaskEpic = action$ => action$.pipe(
    ofType("ADD_TASK_REQUEST"),
    mergeMap((action: PayloadAction<CreateTaskInput>) =>
        from(client.mutate({
            mutation: CREATE_TASK,
            variables: {task: action.payload}
        })).pipe(
            map(response => {
                const task = {...action.payload, ...response.data.taskMutation.createTask}
                return add_task(task);
            })
        )
    )
);

export const update_task_request = (payload: UpdateTaskInput) => ({type: "UPDATE_TASK_REQUEST", payload});

export const updateTaskEpic = action$ => action$.pipe(
    ofType("UPDATE_TASK_REQUEST"),
    mergeMap((action: PayloadAction<UpdateTaskInput>) =>
        from(client.mutate({
                mutation: UPDATE_TASK,
                variables:
                    {
                        id: action.payload.id,
                        task: action.payload.task
                    }
            })
        ).pipe(
            map(() => update_task(action.payload))
        )
    )
);

export const remove_task_request = (payload: number) => ({type: "REMOVE_TASK_REQUEST", payload})
export const removeTaskEpic = action$ => action$.pipe(
    ofType("REMOVE_TASK_REQUEST"),
    mergeMap((action: PayloadAction<number>) =>
        from(client.mutate({
                mutation: DELETE_TASK,
                variables:
                    {
                        id: action.payload,
                    }
            })
        ).pipe(
            map(() => remove_task(action.payload))
        )
    )
);


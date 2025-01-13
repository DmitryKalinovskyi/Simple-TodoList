import { PayloadAction } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { mergeMap, from, map } from "rxjs";
import { client } from "../../../../api/client";
import { CreateTaskInput } from "../../../../models/CreateTaskInput";
import { add_task } from "../../state/tasksSlice";
import { CREATE_TASK } from "../queries/createTaskMutation";

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
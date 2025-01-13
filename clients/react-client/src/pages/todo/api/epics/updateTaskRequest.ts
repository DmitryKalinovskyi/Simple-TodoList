import { PayloadAction } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { mergeMap, from, map } from "rxjs";
import { client } from "../../../../api/client";
import { UpdateTaskInput } from "../../../../models/UpdateTaskInput";
import { update_task } from "../../state/tasksSlice";
import { UPDATE_TASK } from "../queries/updateTaskMutation";

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
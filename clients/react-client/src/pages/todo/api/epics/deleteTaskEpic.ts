import { PayloadAction } from "@reduxjs/toolkit";
import { ofType } from "redux-observable";
import { mergeMap, from, map } from "rxjs";
import { client } from "../../../../api/client";
import { remove_task } from "../../state/tasksSlice";
import { DELETE_TASK } from "../queries/deleteTaskMutation";

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

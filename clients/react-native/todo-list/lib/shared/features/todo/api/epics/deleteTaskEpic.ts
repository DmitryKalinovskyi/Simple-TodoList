import apiRequest from "@/lib/shared/api/apiRequest";
import graphqlRequestHandler from "@/lib/shared/api/graphqlRequestHandler";
import { TodoListRootState } from "@/lib/shared/state/store";
import { Action, PayloadAction } from "@reduxjs/toolkit";
import { Epic, ofType } from "redux-observable";
import { mergeMap } from "rxjs";
import {
    apiDeleteTask,
    apiDeleteTaskSuccess,
    apiDeleteTaskFailure,
} from "../../state/tasksSlice";
import { deleteTaskMutation } from "../queries/deleteTaskMutation";

export const deleteTaskEpic: Epic<Action, Action, TodoListRootState> = (
    action$
) =>
    action$.pipe(
        ofType(apiDeleteTask.type),
        mergeMap((action: PayloadAction<number>) =>
            apiRequest<any>(deleteTaskMutation, {
                id: action.payload,
            }).pipe(
                graphqlRequestHandler(
                    () => apiDeleteTaskSuccess(action.payload),
                    () => apiDeleteTaskFailure(action.payload)
                )
            )
        )
    );

import { Action, PayloadAction } from "@reduxjs/toolkit";
import { Epic, ofType } from "redux-observable";
import { mergeMap } from "rxjs";
import {
    deleteTask,
    deleteTaskFailure,
    deleteTaskSuccess,
} from "../../state/tasksSlice";
import { deleteTaskMutation } from "../queries/deleteTaskMutation";
import apiRequest from "../../../../shared/api/apiRequest";
import { TodoListRootState } from "../../../../state/store";
import graphqlRequestHandler from "../../../../shared/api/graphqlRequestHandler";

export const removeTaskEpic: Epic<Action, Action, TodoListRootState> = (
    action$
) =>
    action$.pipe(
        ofType(deleteTask.type),
        mergeMap((action: PayloadAction<number>) =>
            apiRequest<any>(deleteTaskMutation, {
                id: action.payload,
            }).pipe(
                graphqlRequestHandler(
                    () => deleteTaskSuccess(action.payload),
                    () => deleteTaskFailure()
                )
            )
        )
    );

import { Action, PayloadAction } from "@reduxjs/toolkit";
import { Epic, ofType } from "redux-observable";
import { mergeMap } from "rxjs";
import { UpdateTaskInput } from "../../../../models/UpdateTaskInput";
import { updateTask, updateTaskFailure, updateTaskSuccess } from "../../state/tasksSlice";
import { updateTaskMutation } from "../queries/updateTaskMutation";
import apiRequest from "../../../../shared/api/apiRequest";
import { TodoListRootState } from "../../../../state/store";
import graphqlRequestHandler from "../../../../shared/api/graphqlRequestHandler";

export const updateTaskEpic: Epic<Action, Action, TodoListRootState> = (
    action$
) =>
    action$.pipe(
        ofType(updateTask.type),
        mergeMap((action: PayloadAction<UpdateTaskInput>) =>
            apiRequest<any>(updateTaskMutation, {
                id: action.payload.id,
                task: action.payload.task,
            }).pipe(
                graphqlRequestHandler(
                    () => updateTaskSuccess(action.payload),
                    () => updateTaskFailure()
                )
            )
        )
    );

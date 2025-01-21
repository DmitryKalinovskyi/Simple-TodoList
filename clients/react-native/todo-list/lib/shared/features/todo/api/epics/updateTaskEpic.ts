import UpdateTaskInput from "@/lib/models/UpdateTaskInput";
import apiRequest from "@/lib/shared/api/apiRequest";
import graphqlRequestHandler from "@/lib/shared/api/graphqlRequestHandler";
import { TodoListRootState } from "@/lib/shared/state/store";
import { Action, PayloadAction } from "@reduxjs/toolkit";
import { Epic, ofType } from "redux-observable";
import { mergeMap } from "rxjs";
import {
    apiUpdateTask,
    apiUpdateTaskSuccess,
    apiUpdateTaskFailure,
} from "../../state/tasksSlice";
import { updateTaskMutation } from "../queries/updateTaskMutation";

export const updateTaskEpic: Epic<Action, Action, TodoListRootState> = (
    action$
) =>
    action$.pipe(
        ofType(apiUpdateTask.type),
        mergeMap((action: PayloadAction<UpdateTaskInput>) =>
            apiRequest<any>(updateTaskMutation, { input: action.payload }).pipe(
                graphqlRequestHandler(
                    (response) => {
                        return apiUpdateTaskSuccess({
                            input: action.payload,
                            task: response.data.taskMutation.updateTask,
                        });
                    },
                    () => apiUpdateTaskFailure(action.payload)
                )
            )
        )
    );

import UpdateTaskInput from "@/lib/models/UpdateTaskInput";
import apiRequest from "@/lib/shared/api/apiRequest";
import graphqlRequestHandler from "@/lib/shared/api/graphqlRequestHandler";
import { TodoListRootState } from "@/lib/shared/state/store";
import { Action, PayloadAction } from "@reduxjs/toolkit";
import { Epic, ofType } from "redux-observable";
import { mergeMap } from "rxjs";
import { updateTask, updateTaskSuccess, updateTaskFailure } from "../../state/tasksSlice";
import { updateTaskMutation } from "../queries/updateTaskMutation";

export const updateTaskEpic: Epic<Action, Action, TodoListRootState> = (
    action$
) =>
    action$.pipe(
        ofType(updateTask.type),
        mergeMap((action: PayloadAction<UpdateTaskInput>) =>
            apiRequest<any>(updateTaskMutation, { input: action.payload }).pipe(
                graphqlRequestHandler(
                    (ajaxResponse) => {
                        return updateTaskSuccess(
                            ajaxResponse.response.data.taskMutation.updateTask
                        );
                    },
                    () => updateTaskFailure()
                )
            )
        )
    );

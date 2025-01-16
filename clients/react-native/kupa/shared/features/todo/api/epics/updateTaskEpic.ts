import { Action, PayloadAction } from "@reduxjs/toolkit";
import { Epic, ofType } from "redux-observable";
import { mergeMap } from "rxjs";
import {
    updateTask,
    updateTaskFailure,
    updateTaskSuccess,
} from "../../state/tasksSlice";
import { updateTaskMutation } from "../queries/updateTaskMutation";
import apiRequest from "../../../../api/apiRequest";
import { TodoListRootState } from "../../../../../state/store";
import graphqlRequestHandler from "../../../../api/graphqlRequestHandler";
import UpdateTaskInput from "@/models/UpdateTaskInput";

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

import { Action, PayloadAction } from "@reduxjs/toolkit";
import { Epic, ofType } from "redux-observable";
import { mergeMap } from "rxjs";
import { CreateTaskInput } from "../../../../models/CreateTaskInput";
import {
    createTask,
    createTaskFailure,
    createTaskSuccess,
} from "../../state/tasksSlice";
import { createTaskMutation } from "../queries/createTaskMutation";
import apiRequest from "../../../../shared/api/apiRequest";
import { TodoListRootState } from "../../../../state/store";
import graphqlRequestHandler from "../../../../shared/api/graphqlRequestHandler";

export const createTaskEpic: Epic<Action, Action, TodoListRootState> = (
    action$
) =>
    action$.pipe(
        ofType(createTask.type),
        mergeMap((action: PayloadAction<CreateTaskInput>) =>
            apiRequest<any>(createTaskMutation, { task: action.payload }).pipe(
                graphqlRequestHandler(
                    (ajaxResponse) => {
                        const task = {
                            ...action.payload,
                            ...ajaxResponse.response.data.taskMutation
                                .createTask,
                        };
                        return createTaskSuccess(task);
                    },
                    () => createTaskFailure()
                )
            )
        )
    );

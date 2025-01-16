import CreateTaskInput from "@/lib/models/CreateTaskInput";
import apiRequest from "@/lib/shared/api/apiRequest";
import graphqlRequestHandler from "@/lib/shared/api/graphqlRequestHandler";
import { TodoListRootState } from "@/lib/shared/state/store";
import { Action, PayloadAction } from "@reduxjs/toolkit";
import { Epic, ofType } from "redux-observable";
import { mergeMap } from "rxjs";
import { createTask, createTaskSuccess, createTaskFailure } from "../../state/tasksSlice";
import { createTaskMutation } from "../queries/createTaskMutation";

export const createTaskEpic: Epic<Action, Action, TodoListRootState> = (
    action$
) =>
    action$.pipe(
        ofType(createTask.type),
        mergeMap((action: PayloadAction<CreateTaskInput>) =>
            apiRequest<any>(createTaskMutation, { input: action.payload }).pipe(
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

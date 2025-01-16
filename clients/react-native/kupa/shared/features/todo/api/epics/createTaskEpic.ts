import { PayloadAction } from "@reduxjs/toolkit";
import { Action } from "redux";
import { Epic, ofType } from "redux-observable";
import { mergeMap } from "rxjs";
import { TodoListRootState } from "../../../../../state/store";
import apiRequest from "../../../../api/apiRequest";
import graphqlRequestHandler from "../../../../api/graphqlRequestHandler";
import { createTask, createTaskSuccess, createTaskFailure } from "../../state/tasksSlice";
import { createTaskMutation } from "../queries/createTaskMutation";
import CreateTaskInput from "@/models/CreateTaskInput";

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

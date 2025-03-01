import CreateTaskInput from "@/lib/models/CreateTaskInput";
import apiRequest from "@/lib/shared/api/apiRequest";
import graphqlRequestHandler from "@/lib/shared/api/graphqlRequestHandler";
import { TodoListRootState } from "@/lib/shared/state/store";
import { Action, PayloadAction } from "@reduxjs/toolkit";
import { Epic, ofType } from "redux-observable";
import { map, mergeMap, of } from "rxjs";
import {
    apiCreateTask,
    apiCreateTaskSuccess,
    apiCreateTaskFailure,
} from "../../state/tasksSlice";
import { createTaskMutation } from "../queries/createTaskMutation";

export const createTaskEpic: Epic<Action, Action, TodoListRootState> = (
    action$
) =>
    action$.pipe(
        ofType(apiCreateTask.type),
        mergeMap((action: PayloadAction<CreateTaskInput>) =>
            apiRequest<any>(createTaskMutation, { input: {...action.payload, id: undefined} }).pipe(
                graphqlRequestHandler(
                    (response) => {
                        const task = response.data.taskMutation.createTask;
                        return apiCreateTaskSuccess({
                            task,
                            input: action.payload,
                        });
                    },
                    () => apiCreateTaskFailure(action.payload)
                )
            )
        )
    );

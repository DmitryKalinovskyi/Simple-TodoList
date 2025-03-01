import apiRequest from "@/lib/shared/api/apiRequest";
import graphqlRequestHandler from "@/lib/shared/api/graphqlRequestHandler";
import { appInit } from "@/lib/shared/state/actions";
import { TodoListRootState } from "@/lib/shared/state/store";
import { Action } from "@reduxjs/toolkit";
import { Epic, ofType } from "redux-observable";
import { delay, switchMap } from "rxjs";
import {
    initializeFromStorageSuccess,
    updateAllSettings,
    updateSettings,
} from "../../../settings/state/settingsSlice";
import {
    fetchTasks,
    fetchTasksSuccess,
    fetchTasksFailure,
} from "../../state/tasksSlice";
import { tasksQuery } from "../queries/tasksQuery";

export const fetchTasksEpic: Epic<Action, Action, TodoListRootState> = (
    action$
) =>
    action$.pipe(
        ofType(fetchTasks.type),
        switchMap(() =>
            apiRequest<any>(tasksQuery).pipe(
                graphqlRequestHandler(
                    (response) =>
                        fetchTasksSuccess(response.data.taskQuery.tasks),
                    () => fetchTasksFailure()
                )
            )
        )
    );

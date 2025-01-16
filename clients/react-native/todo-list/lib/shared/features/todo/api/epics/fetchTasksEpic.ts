import apiRequest from "@/lib/shared/api/apiRequest";
import graphqlRequestHandler from "@/lib/shared/api/graphqlRequestHandler";
import { appInit } from "@/lib/shared/state/actions";
import { TodoListRootState } from "@/lib/shared/state/store";
import { Action } from "@reduxjs/toolkit";
import { Epic, ofType } from "redux-observable";
import { switchMap } from "rxjs";
import { updateAllSettings, updateSettings } from "../../../settings/state/settingsSlice";
import { fetchTasks, fetchTasksSuccess, fetchTasksFailure } from "../../state/tasksSlice";
import { tasksQuery } from "../queries/tasksQuery";

export const fetchTasksEpic: Epic<Action, Action, TodoListRootState> = (
    action$
) =>
    action$.pipe(
        ofType(appInit.type, fetchTasks.type, updateAllSettings.type, updateSettings.type),
        switchMap(() =>
            apiRequest<any>(tasksQuery).pipe(
                graphqlRequestHandler(
                    (ajaxResponse) =>
                        fetchTasksSuccess(
                            ajaxResponse.response.data.taskQuery.tasks
                        ),
                    () => fetchTasksFailure()
                )
            )
        )
    );

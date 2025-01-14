import { Epic, ofType } from "redux-observable";
import { switchMap } from "rxjs";
import {
    fetchTasks,
    fetchTasksFailure,
    fetchTasksSuccess,
} from "../../state/tasksSlice";
import { tasksQuery } from "../queries/tasksQuery";
import apiRequest from "../../../../shared/api/apiRequest";
import { Action } from "@reduxjs/toolkit";
import { TodoListRootState } from "../../../../state/store";
import graphqlRequestHandler from "../../../../shared/api/graphqlRequestHandler";
import { updateProperties } from "../../../../shared/features/properties/state/propertiesSlice";
import { appInit } from "../../../../state/actions";

export const fetchTasksEpic: Epic<Action, Action, TodoListRootState> = (
    action$
) =>
    action$.pipe(
        ofType(appInit.type, fetchTasks.type, updateProperties.type),
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

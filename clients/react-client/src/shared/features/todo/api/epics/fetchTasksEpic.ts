import { Action } from "redux";
import { Epic, ofType } from "redux-observable";
import { switchMap } from "rxjs";
import { appInit } from "../../../../../state/actions";
import { TodoListRootState } from "../../../../../state/store";
import apiRequest from "../../../../api/apiRequest";
import graphqlRequestHandler from "../../../../api/graphqlRequestHandler";
import { updateAllSettings } from "../../../settings/state/settingsSlice";
import { fetchTasks, fetchTasksSuccess, fetchTasksFailure } from "../../state/tasksSlice";
import { tasksQuery } from "../queries/tasksQuery";

export const fetchTasksEpic: Epic<Action, Action, TodoListRootState> = (
    action$
) =>
    action$.pipe(
        ofType(appInit.type, fetchTasks.type, updateAllSettings.type),
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

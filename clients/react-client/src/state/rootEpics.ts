import { combineEpics, Epic } from "redux-observable";
import { removeTaskEpic } from "../shared/features/todo/api/epics/deleteTaskEpic";
import { createTaskEpic } from "../shared/features/todo/api/epics/createTaskEpic";
import { fetchTasksEpic } from "../shared/features/todo/api/epics/fetchTasksEpic";
import { updateTaskEpic } from "../shared/features/todo/api/epics/updateTaskEpic";
import { Action } from "redux";
import { TodoListRootState } from "./store";
import { catchError } from "rxjs";
import { fetchCategoriesEpic } from "../shared/features/categories/api/epics/fetchCategoriesEpic";

export const rootEpic: Epic<Action, Action, TodoListRootState> = (
    action$,
    store$,
    dependencies
) =>
    combineEpics(
        fetchTasksEpic,
        updateTaskEpic,
        removeTaskEpic,
        createTaskEpic,

        fetchCategoriesEpic,
    )(action$, store$, dependencies).pipe(
        catchError((error, source) => {
            console.error(error);
            return source;
        })
    );

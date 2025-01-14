import { combineEpics, Epic } from "redux-observable";
import { removeTaskEpic } from "../pages/todo/api/epics/deleteTaskEpic";
import { createTaskEpic } from "../pages/todo/api/epics/createTaskEpic";
import { fetchTasksEpic } from "../pages/todo/api/epics/fetchTasksEpic";
import { updateTaskEpic } from "../pages/todo/api/epics/updateTaskEpic";
import { Action } from "redux";
import { TodoListRootState } from "./store";
import { catchError } from "rxjs";
import { fetchCategoriesEpic } from "../pages/categories/api/epics/fetchCategoriesEpic";

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

import { Action } from "@reduxjs/toolkit";
import { Epic, combineEpics } from "redux-observable";
import { catchError, of } from "rxjs";
import { createCategoryEpic } from "../features/categories/api/epics/createCategoryEpic";
import { deleteCategoryEpic } from "../features/categories/api/epics/deleteCategoryEpic";
import { fetchCategoriesEpic } from "../features/categories/api/epics/fetchCategoriesEpic";
import { updateCategoryEpic } from "../features/categories/api/epics/updateCategoryEpic";
import { loadSettingsEpic } from "../features/settings/epics/loadSettingsEpic";
import { saveSettingsEpic } from "../features/settings/epics/saveSettingsEpic";
import { createTaskEpic } from "../features/todo/api/epics/createTaskEpic";
import { deleteTaskEpic } from "../features/todo/api/epics/deleteTaskEpic";
import { fetchTasksEpic } from "../features/todo/api/epics/fetchTasksEpic";
import { updateTaskEpic } from "../features/todo/api/epics/updateTaskEpic";
import { TodoListRootState } from "./store";
import { notifyError } from "../features/notification/state/notificationSlice";

export const rootEpic: Epic<Action, Action, TodoListRootState> = (
    action$,
    store$,
    dependencies
) =>
    combineEpics(
        fetchTasksEpic,
        updateTaskEpic,
        deleteTaskEpic,
        createTaskEpic,

        fetchCategoriesEpic,
        createCategoryEpic,
        updateCategoryEpic,
        deleteCategoryEpic,

        saveSettingsEpic,
        loadSettingsEpic,
    )(action$, store$, dependencies).pipe(
        catchError((error, source) => {
            console.log(JSON.stringify(error));
            return source;
            // return of(notifyError(error.message));
        })
    );

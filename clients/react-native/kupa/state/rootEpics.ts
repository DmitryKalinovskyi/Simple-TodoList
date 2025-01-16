import { combineEpics, Epic } from "redux-observable";
import { deleteTaskEpic } from "../shared/features/todo/api/epics/deleteTaskEpic";
import { createTaskEpic } from "../shared/features/todo/api/epics/createTaskEpic";
import { fetchTasksEpic } from "../shared/features/todo/api/epics/fetchTasksEpic";
import { updateTaskEpic } from "../shared/features/todo/api/epics/updateTaskEpic";
import { Action } from "redux";
import { TodoListRootState } from "./store";
import { catchError } from "rxjs";
import { fetchCategoriesEpic } from "../shared/features/categories/api/epics/fetchCategoriesEpic";
import { saveSettingsEpic } from "../shared/features/settings/epics/saveSettingsEpic";
import { updateCategoryEpic } from "../shared/features/categories/api/epics/updateCategoryEpic";
import { deleteCategoryEpic } from "../shared/features/categories/api/epics/deleteCategoryEpic";
import { createCategoryEpic } from "../shared/features/categories/api/epics/createCategoryEpic";
import { loadSettingsEpic } from "@/shared/features/settings/epics/loadSettingsEpic";

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
            console.error(error);
            return source;
        })
    );

import { Action } from "@reduxjs/toolkit";
import { Epic } from "redux-observable";
import { filter, map } from "rxjs";
import { TodoListRootState } from "../store";
import { fetchTasks } from "../../features/todo/state/tasksSlice";
import {
    initializeFromStorageSuccess,
    updateSettings,
} from "../../features/settings/state/settingsSlice";

export const taskFetchStrategyEpic: Epic<Action, Action, TodoListRootState> = (
    action$
) =>
    action$.pipe(
        filter((action) => {
            if (action.type === initializeFromStorageSuccess.type) {
                return true;
            }
            if (action.type === updateSettings.type) {
                return true;
                // return action.payload.key === "storageType";
            }

            return false;
        }),
        map(() => fetchTasks())
    );

import { Action } from "@reduxjs/toolkit";
import { Epic } from "redux-observable";
import { filter, map } from "rxjs";
import { fetchCategories } from "../../features/categories/state/categoriesSlice";
import { TodoListRootState } from "../store";
import {
    initializeFromStorageSuccess,
    updateSettings,
} from "../../features/settings/state/settingsSlice";

export const categoriesFetchStrategyEpic: Epic<
    Action,
    Action,
    TodoListRootState
> = (action$) =>
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
        map(() => fetchCategories())
    );

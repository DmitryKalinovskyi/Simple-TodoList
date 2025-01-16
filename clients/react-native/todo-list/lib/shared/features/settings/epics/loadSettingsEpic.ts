import { SETTINGS_STORAGE_KEY } from "@/lib/config";
import { appInit } from "@/lib/shared/state/actions";
import { TodoListRootState } from "@/lib/shared/state/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Action } from "@reduxjs/toolkit";
import { Epic, ofType } from "redux-observable";
import { switchMap, from, map } from "rxjs";
import { initializeFromStorageSuccess, initializeFromStorageFailure } from "../state/settingsSlice";

export const loadSettingsEpic: Epic<Action, Action, TodoListRootState> = (
    action$,
    store$
) =>
    action$.pipe(
        ofType(appInit.type),
        switchMap(() =>
            from(AsyncStorage.getItem(SETTINGS_STORAGE_KEY)).pipe(
                map((json: string | null) =>
                    json
                        ? initializeFromStorageSuccess(
                              JSON.parse(json as string)
                          )
                        : initializeFromStorageFailure()
                )
            )
        )
    );

import { SETTINGS_STORAGE_KEY } from "@/shared/config";
import { appInit } from "@/state/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { from, map, switchMap } from "rxjs";
import {
    initializeFromStorageFailure,
    initializeFromStorageSuccess,
} from "../state/settingsSlice";
import { TodoListRootState } from "@/state/store";
import { Action } from "redux";
import { Epic, ofType } from "redux-observable";

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

import { SETTINGS_STORAGE_KEY } from "@/lib/config";
import { TodoListRootState } from "@/lib/shared/state/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Action } from "@reduxjs/toolkit";
import { Epic, ofType } from "redux-observable";
import { debounceTime, switchMap } from "rxjs";
import { updateSettings, updateAllSettings } from "../state/settingsSlice";

export const saveSettingsEpic: Epic<Action, Action, TodoListRootState> = (
    action$, store$
) =>
    action$.pipe(
        ofType(updateSettings.type, updateAllSettings.type),
        debounceTime(300),
        switchMap(() => {
            const settings = store$.value.settings.settingsCollection;
            AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
            return [];
        }),
    );
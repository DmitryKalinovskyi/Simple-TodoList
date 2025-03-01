import { Action } from "redux";
import { Epic, ofType } from "redux-observable";
import { TodoListRootState } from "../../../../state/store";
import { updateAllSettings, updateSettings } from "../state/settingsSlice";
import { debounceTime, switchMap } from "rxjs";
import { SETTINGS_STORAGE_KEY } from "../../../config";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
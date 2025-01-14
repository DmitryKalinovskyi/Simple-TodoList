import { Action } from "redux";
import { Epic, ofType } from "redux-observable";
import { TodoListRootState } from "../../../../state/store";
import { updateAllSettings, updateSettings } from "../state/settingsSlice";
import { debounceTime, switchMap } from "rxjs";
import { SETTINGS_STORAGE_KEY } from "../../../config";

export const saveSettingsToStorageEpic: Epic<Action, Action, TodoListRootState> = (
    action$, store$
) =>
    action$.pipe(
        ofType(updateSettings.type, updateAllSettings.type),
        debounceTime(300),
        switchMap(() => {
            const settings = store$.value.settings.settingsCollection;
            localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
            return [];
        }),
    );
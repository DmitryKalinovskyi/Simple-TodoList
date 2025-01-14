import { useDispatch, useSelector } from "react-redux";
import { TodoListRootState } from "../../../../state/store";
import { SettingsCollection, updateSettings } from "../state/settingsSlice";
import { useCallback } from "react";

export default function useSetting<T extends SettingsCollection[keyof SettingsCollection]>(
    key: keyof SettingsCollection
): [T, (value: T) => void] {
    const settingsCollection = useSelector(
        (state: TodoListRootState) => state.settings.settingsCollection
    );
    const dispatch = useDispatch();

    const setSetting = useCallback(
        (value: T) => {
            dispatch(updateSettings({ key, value }));
        },
        [settingsCollection]
    );

    const settingValue = settingsCollection[key] as T;

    return [settingValue, setSetting];
}

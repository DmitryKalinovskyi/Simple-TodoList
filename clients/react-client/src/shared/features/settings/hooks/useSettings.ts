import { useDispatch, useSelector } from "react-redux";
import { TodoListRootState } from "../../../../state/store";
import { SettingsCollection, updateSettings } from "../state/settingsSlice";
import { useCallback } from "react";

type ValueType = SettingsCollection[keyof SettingsCollection];

export default function useSettings(
): [SettingsCollection, (key: keyof SettingsCollection, value: ValueType) => void] {
    const settings = useSelector(
        (state: TodoListRootState) => state.settings.settingsCollection
    );
    const dispatch = useDispatch();

    const setSetting = useCallback(
        (key: keyof SettingsCollection, value: ValueType) => {
            dispatch(updateSettings({ key, value }));
        },
        [settings]
    );

    return [settings, setSetting];
}

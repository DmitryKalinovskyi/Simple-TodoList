import { useDispatch, useSelector } from "react-redux";
import {updateSettings } from "../state/settingsSlice";
import { useCallback } from "react";
import { TodoListRootState } from "@/lib/shared/state/store";
import { SettingsCollection } from "../SettingsCollection";

export default function useSetting<T extends SettingsCollection[keyof SettingsCollection]>(
    key: keyof SettingsCollection
): [T, (value: T) => void] {
    const setting = useSelector(
        (state: TodoListRootState) => state.settings.settingsCollection[key]
    ) as T;
    const dispatch = useDispatch();

    const setSetting = useCallback(
        (value: T) => {
            dispatch(updateSettings({ key, value }));
        },
        [setting]
    );

    return [setting, setSetting];
}

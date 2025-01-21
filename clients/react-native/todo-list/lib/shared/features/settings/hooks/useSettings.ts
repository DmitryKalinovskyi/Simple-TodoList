import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { TodoListRootState } from "@/lib/shared/state/store";
import { SettingsCollection } from "../SettingsCollection";
import { updateSettings } from "../state/settingsSlice";

type ValueType = SettingsCollection[keyof SettingsCollection];

export default function useSettings(
): [SettingsCollection, (key: keyof SettingsCollection, value: ValueType) => void] {
    const settings = useSelector(
        (state: TodoListRootState) => state.settings.settingsCollection
    );
    const dispatch = useDispatch();

    const setSetting = (key: keyof SettingsCollection, value: ValueType) => {
            dispatch(updateSettings({ key, value }));
        };

    return [settings, setSetting];
}

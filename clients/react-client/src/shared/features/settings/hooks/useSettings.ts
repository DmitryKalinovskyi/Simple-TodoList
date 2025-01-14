import { useDispatch, useSelector } from "react-redux";
import { TodoListRootState } from "../../../../state/store";
import { updateSettings } from "../state/settingsSlice";
import { useCallback, useState } from "react";

export default function useSettings<ValueType = string>(
    key: "storageType" | "displayCompleted"
): [ValueType, (value: ValueType) => void] {
    useState();
    const properties = useSelector(
        (state: TodoListRootState) => state.settings
    );
    const dispatch = useDispatch();

    const setProperty = useCallback(
        (value: any) => {
            dispatch(updateSettings({ ...properties, [key]: value }));
        },
        [properties]
    );

    const propertyValue: ValueType = properties[key] as ValueType;

    return [propertyValue, setProperty];
}

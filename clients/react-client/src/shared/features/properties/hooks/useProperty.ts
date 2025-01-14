import { useDispatch, useSelector } from "react-redux";
import { TodoListRootState } from "../../../../state/store";
import { updateProperties } from "../state/propertiesSlice";
import { useCallback, useState } from "react";

export default function useProperty<ValueType = string>(
    key: "storageType"
): [ValueType, (value: ValueType) => void] {
    useState();
    const properties = useSelector(
        (state: TodoListRootState) => state.properties
    );
    const dispatch = useDispatch();

    const setProperty = useCallback(
        (value: any) => {
            dispatch(updateProperties({ ...properties, [key]: value }));
        },
        [properties]
    );

    const propertyValue: ValueType = properties[key] as ValueType;

    return [propertyValue, setProperty];
}

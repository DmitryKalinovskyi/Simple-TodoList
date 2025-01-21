import { apiCreateTask } from "@/lib/shared/features/todo/state/tasksSlice";
import { CheckBox, Toggle } from "@ui-kitten/components";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function TestCheck(){
    const [checked, setCheked] = useState(false);

    const dispatch = useDispatch();
    const handleCheck = (c: boolean) => {
        setCheked(c);
        // dispatch(apiCreateTask({id: 13232123, name:"testTask", isCompleted: false}))
    }
    return <Toggle checked={checked} onChange={(c) => handleCheck(c)}/>
}
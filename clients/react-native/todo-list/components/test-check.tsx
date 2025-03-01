import { Toggle } from "@ui-kitten/components";
import { useState } from "react";

export default function TestCheck(){
    const [checked, setCheked] = useState(false);

    // const dispatch = useDispatch();
    const handleCheck = (c: boolean) => {
        setCheked(c);
        // dispatch(apiCreateTask({id: 13232123, name:"testTask", isCompleted: false}))
    }
    return <Toggle checked={checked} onChange={(c) => handleCheck(c)}/>
}
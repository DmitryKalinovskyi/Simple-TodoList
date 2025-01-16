import { useDispatch } from "react-redux";
import Tasks from "./(tabs)/tasks";
import { appInit } from "@/state/actions";
import { useEffect } from "react";

export default function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(appInit());
    }, [dispatch]);

    return <Tasks />
}
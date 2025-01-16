import { appInit } from "@/lib/shared/state/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

interface AppInitializerProps{
    children: JSX.Element | JSX.Element[]
}

export default function AppInitializerProvider(props: AppInitializerProps){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(appInit());
    }, [dispatch]);

    return props.children;
}
import {configureStore, Tuple} from "@reduxjs/toolkit"
import {createEpicMiddleware} from "redux-observable";
import { rootEpic } from "./rootEpics";
import { categoriesReducer } from "../pages/categories/state/categoriesSlice";
import { tasksReducer } from "../pages/todo/state/tasksSlice";

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        categories: categoriesReducer
    },
    middleware: () => new Tuple(epicMiddleware)
})

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
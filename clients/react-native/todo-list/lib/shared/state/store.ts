import {configureStore, Tuple} from "@reduxjs/toolkit"
import {createEpicMiddleware} from "redux-observable";
import { rootEpic } from "./rootEpics";
import { categoriesReducer } from "../features/categories/state/categoriesSlice";
import { scheduleReducer } from "../features/schedule/state/scheduleSlice";
import { settingsReducer } from "../features/settings/state/settingsSlice";
import { tasksReducer } from "../features/todo/state/tasksSlice";
import configureSubscriptions from "./configureSubscriptions";

let epicMiddleware = createEpicMiddleware();

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        categories: categoriesReducer,
        settings: settingsReducer,
        schedule: scheduleReducer,
    },
    middleware: () => new Tuple(epicMiddleware)
})

epicMiddleware.run(rootEpic);
configureSubscriptions();

export type TodoListRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
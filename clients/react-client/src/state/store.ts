import {configureStore, Tuple} from "@reduxjs/toolkit"
import {createEpicMiddleware} from "redux-observable";
import { rootEpic } from "./rootEpics";
import { categoriesReducer } from "../shared/features/categories/state/categoriesSlice";
import { tasksReducer } from "../shared/features/todo/state/tasksSlice";
import { settingsReducer } from "../shared/features/settings/state/settingsSlice";
import { scheduleReducer } from "../shared/features/schedule/state/scheduleSlice";

let epicMiddleware = createEpicMiddleware();

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        categories: categoriesReducer,
        settings: settingsReducer,
        schedule: scheduleReducer
    },
    middleware: () => new Tuple(epicMiddleware)
})

epicMiddleware.run(rootEpic);

export type TodoListRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
import {configureStore, Tuple} from "@reduxjs/toolkit"
import tasksReducer from "./tasksSlice.ts"
import categoriesReducer from "./categoriesSlice.ts"
import {createEpicMiddleware} from "redux-observable";
import {rootEpic} from "./epics/rootEpics.ts";

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
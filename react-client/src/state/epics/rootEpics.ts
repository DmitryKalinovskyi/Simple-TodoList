import {combineEpics} from "redux-observable";
import {addTaskEpic, fetchTasksEpic, removeTaskEpic, updateTaskEpic} from "./tasksEpics.ts";

export const rootEpic = combineEpics(
    fetchTasksEpic,
    updateTaskEpic,
    removeTaskEpic,
    addTaskEpic
)
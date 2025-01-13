import {combineEpics} from "redux-observable";
import { removeTaskEpic } from "../pages/todo/api/epics/deleteTaskEpic";
import { addTaskEpic } from "../pages/todo/api/epics/createTaskEpic";
import { fetchTasksEpic } from "../pages/todo/api/epics/fetchTasksEpic";
import { updateTaskEpic } from "../pages/todo/api/epics/updateTaskRequest";

export const rootEpic = combineEpics(
    fetchTasksEpic,
    updateTaskEpic,
    removeTaskEpic,
    addTaskEpic
)
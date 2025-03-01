import { delay, filter, map } from "rxjs";
import { appInit } from "../actions";
import { Action } from "@reduxjs/toolkit";
import { Epic, ofType } from "redux-observable";
import { confirmApplicationLoad } from "../sharedSlice";
import { TodoListRootState } from "../store";

export const applicationLoaderEpic: Epic<Action, Action, TodoListRootState> = (
    action$
) =>
    action$.pipe(
        ofType(appInit.type),
        delay(2000),
        map(() => confirmApplicationLoad())
    );

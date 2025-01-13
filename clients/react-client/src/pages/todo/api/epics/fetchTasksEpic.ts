import { ofType } from "redux-observable";
import { mergeMap, from, map, switchMap } from "rxjs";
import { client } from "../../../../api/client";
import { set_tasks } from "../../state/tasksSlice";
import { TASKS_QUERY } from "../queries/tasksQuery";

export const fetch_tasks = () => ({type: "FETCH_TASKS"});
export const fetchTasksEpic = action$ => action$.pipe(
    ofType("FETCH_TASKS"),
    switchMap(() =>
        from(client.query({
            query: TASKS_QUERY,
        })).pipe(
            map(response => set_tasks(response.data.taskQuery.tasks))
        )
    )
);
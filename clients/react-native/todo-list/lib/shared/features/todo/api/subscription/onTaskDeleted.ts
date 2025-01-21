import GraphQLResponse from "@/lib/shared/api/GraphQLResponse";
import observeGqlSubscription from "@/lib/shared/api/subscriptions/observeGqlSubscription";
import dispatcher from "@/lib/shared/state/rxjs/dispatcher";
import { map, tap } from "rxjs";
import { addTask, apiCreateTaskSuccess, removeTask } from "../../state/tasksSlice";

export function onTaskDeleted(){
    return observeGqlSubscription(`subscription OnTaskDeleted{
  onTaskDeleted
}`).pipe(
        // tap(response => console.log(response)),
        map((response: GraphQLResponse) => removeTask(response.data.onTaskDeleted)),
        dispatcher()
    )
}
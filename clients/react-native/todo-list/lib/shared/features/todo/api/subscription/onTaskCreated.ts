import GraphQLResponse from "@/lib/shared/api/GraphQLResponse";
import observeGqlSubscription from "@/lib/shared/api/subscriptions/observeGqlSubscription";
import dispatcher from "@/lib/shared/state/rxjs/dispatcher";
import { map, tap } from "rxjs";
import { addTask, apiCreateTaskSuccess } from "../../state/tasksSlice";

export function onTaskCreated(){
    return observeGqlSubscription(`subscription OnTaskCreated{
  onTaskCreated{
    id,
    name,
    isCompleted,
    deadline,
    category{
      id,
      name
    }
  }
}`).pipe(
        // tap(response => console.log(response)),
        map((response: GraphQLResponse) => addTask(response.data.onTaskCreated)),
        dispatcher()
    )
}
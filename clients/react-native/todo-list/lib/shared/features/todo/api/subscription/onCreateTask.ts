import GraphQLResponse from "@/lib/shared/api/GraphQLResponse";
import observeGqlSubscription from "@/lib/shared/api/subscriptions/observeGqlSubscription";
import dispatcher from "@/lib/shared/state/dispatcher";
import { map, tap } from "rxjs";
import { createTaskSuccess } from "../../state/tasksSlice";

export function onCreateTask(){
    return observeGqlSubscription(`subscription OnTaskCreated{
  onTaskCreated{
    id,
    name,
    isCompleted,
    category{
      id,
      name
    }
  }
}`).pipe(
        // tap(response => console.log(response)),
        map((response: GraphQLResponse) => createTaskSuccess(response.data.onTaskCreated)),
        dispatcher()
    )
}
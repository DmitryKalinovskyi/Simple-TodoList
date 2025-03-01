import GraphQLResponse from "@/lib/shared/api/GraphQLResponse";
import observeGqlSubscription from "@/lib/shared/api/subscriptions/observeGqlSubscription";
import dispatcher from "@/lib/shared/state/rxjs/dispatcher";
import { map, tap } from "rxjs";
import { addTask, apiCreateTaskSuccess, updateTask } from "../../state/tasksSlice";

export function onTaskUpdated(){
    return observeGqlSubscription(`subscription OnTaskUpdated{
  onTaskUpdated{
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
        map((response: GraphQLResponse) => updateTask(response.data.onTaskUpdated)),
        dispatcher()
    )
}
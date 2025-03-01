import { Observable } from "rxjs";
import wsClient from "../wsClient";
import GraphQLResponse from "../GraphQLResponse";

export default function observeGqlSubscription<T extends GraphQLResponse>(query: string){
    return new Observable<T>((subscriber) => {
        // Start the subscription using wsClient
        const unsubscribe = wsClient.subscribe(
          {
            query,
            // variables,
          },
          {
            next: (data: T) => {
              // Emit data to the observable's subscribers
              subscriber.next(data);
            },
            error: (err) => {
              // Emit an error and complete the observable
              subscriber.error(err);
            },
            complete: () => {
              // Notify subscribers that the stream is complete
              subscriber.complete();
            },
          }
        );
    
        // Return cleanup logic to unsubscribe when the observable is disposed
        return () => {
          unsubscribe();
        };
    });
}
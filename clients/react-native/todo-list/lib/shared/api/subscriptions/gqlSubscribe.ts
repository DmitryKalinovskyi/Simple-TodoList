import { Observable } from "rxjs";
import wsClient from "../wsClient";

export function gqlSubscribe(query, variables){

    return wsClient.subscribe(
        {
          query,
          variables,
        },
        {
          next: (data) => onNext(data), // Handle incoming data
          error: (err) => console.error('Subscription error:', err),
          complete: () => console.log('Subscription completed'),
        }
      );
}
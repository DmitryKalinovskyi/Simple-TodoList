import { ajax, AjaxConfig } from "rxjs/ajax";
import buildHeaders from "./buildHeaders";
import { BASE_GRAPHQL_URL } from "../../config";
import { from, map, mergeMap, tap } from "rxjs";

export default function apiRequest<ResponseType>(query: string, variables: object = {}){
    return from(fetch(BASE_GRAPHQL_URL, {
        method: "POST",
        headers: {
            ...buildHeaders(),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    })).pipe(
        mergeMap(response => from(response.json() as Promise<ResponseType>)),
        // tap(response => console.log("Tapped: " + JSON.stringify(response)))
    )
    // return ajax<ResponseType>({
    //     method: 'POST',
    //     url: BASE_GRAPHQL_URL,
    //     headers: buildHeaders(),
    //     responseType: "json",
    //     body: {
    //         query,
    //         variables
    //     }
    // } as AjaxConfig)
}
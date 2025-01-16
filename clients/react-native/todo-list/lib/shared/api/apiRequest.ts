import { ajax, AjaxConfig } from "rxjs/ajax";
import buildHeaders from "./buildHeaders";
import { BASE_GRAPHQL_URL } from "../../config";

export default function apiRequest<ResponseType>(query: string, variables: object = {}){
    return ajax<ResponseType>({
        method: 'POST',
        url: BASE_GRAPHQL_URL,
        headers: buildHeaders(),
        responseType: "json",
        body: {
            query,
            variables
        }
    } as AjaxConfig)
}
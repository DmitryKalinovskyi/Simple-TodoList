import { AjaxResponse } from "rxjs/ajax";
import { Action } from "@reduxjs/toolkit";
import { map } from "rxjs";
import GraphQLResponse from "./GraphQLResponse";

export default function graphqlRequestHandler<
    ResponseType extends GraphQLResponse
>(
    onSuccess: (response: ResponseType) => Action,
    onFailure: (response: ResponseType) => Action
) {
    return map((response: ResponseType) => {
        if (response.errors) {
            console.log(response.errors)
            return onFailure(response);
        }

        return onSuccess(response);
    });
}

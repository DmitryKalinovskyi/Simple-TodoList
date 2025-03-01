import { AjaxResponse } from "rxjs/ajax";
import { Action } from "@reduxjs/toolkit";
import { map } from "rxjs";
import GraphQLResponse from "./GraphQLResponse";

type RequestCallbackType<ResponseType> = (
    response: AjaxResponse<ResponseType>
) => Action;

export default function graphqlRequestHandler<
    ResponseType extends GraphQLResponse
>(
    onSuccess: RequestCallbackType<ResponseType>,
    onFailure: RequestCallbackType<ResponseType>
) {
    return map((ajaxResponse: AjaxResponse<ResponseType>) => {
        if (ajaxResponse.response.errors) {
            console.log(ajaxResponse.response.errors)
            return onFailure(ajaxResponse);
        }

        return onSuccess(ajaxResponse);
    });
}

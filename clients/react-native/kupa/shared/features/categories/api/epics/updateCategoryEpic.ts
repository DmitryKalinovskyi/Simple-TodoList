import { mergeMap } from "rxjs";
import {
    updateCategory,
    updateCategoryFailure,
    updateCategorySuccess,
} from "../../state/categoriesSlice";
import { updateCategoryMutation } from "../queries/updateCategoryMutation";
import { Action } from "redux";
import { Epic, ofType } from "redux-observable";
import { TodoListRootState } from "../../../../../state/store";
import apiRequest from "../../../../api/apiRequest";
import graphqlRequestHandler from "../../../../api/graphqlRequestHandler";
import { PayloadAction } from "@reduxjs/toolkit";
import UpdateTaskInput from "@/models/UpdateTaskInput";

export const updateCategoryEpic: Epic<Action, Action, TodoListRootState> = (
    action$
) =>
    action$.pipe(
        ofType(updateCategory.type),
        mergeMap((action: PayloadAction<UpdateTaskInput>) =>
            apiRequest<any>(updateCategoryMutation, {
                input: action.payload,
            }).pipe(
                graphqlRequestHandler(
                    (ajaxResponse) =>
                        updateCategorySuccess(
                            ajaxResponse.response.data.categoryMutation
                                .updateCategory
                        ),
                    () => updateCategoryFailure()
                )
            )
        )
    );

import UpdateTaskInput from "@/lib/models/UpdateTaskInput";
import apiRequest from "@/lib/shared/api/apiRequest";
import graphqlRequestHandler from "@/lib/shared/api/graphqlRequestHandler";
import { TodoListRootState } from "@/lib/shared/state/store";
import { Action, PayloadAction } from "@reduxjs/toolkit";
import { Epic, ofType } from "redux-observable";
import { mergeMap } from "rxjs";
import {
    updateCategory,
    updateCategorySuccess,
    updateCategoryFailure,
} from "../../state/categoriesSlice";
import { updateCategoryMutation } from "../queries/updateCategoryMutation";

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
                    (response) =>
                        updateCategorySuccess(
                            response.data.categoryMutation.updateCategory
                        ),
                    () => updateCategoryFailure()
                )
            )
        )
    );

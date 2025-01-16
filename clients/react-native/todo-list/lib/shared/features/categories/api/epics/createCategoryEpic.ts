import CreateCategoryInput from "@/lib/models/CreateCategoryInput";
import apiRequest from "@/lib/shared/api/apiRequest";
import graphqlRequestHandler from "@/lib/shared/api/graphqlRequestHandler";
import { TodoListRootState } from "@/lib/shared/state/store";
import { Action, PayloadAction } from "@reduxjs/toolkit";
import { Epic, ofType } from "redux-observable";
import { mergeMap } from "rxjs";
import { createCategory, createCategorySuccess, createCategoryFailure } from "../../state/categoriesSlice";
import { createCategoryMutation } from "../queries/createCategoryMutation";


export const createCategoryEpic: Epic<Action, Action, TodoListRootState> = (
    action$
) =>
    action$.pipe(
        ofType(createCategory.type),
        mergeMap((action: PayloadAction<CreateCategoryInput>) =>
            apiRequest<any>(createCategoryMutation, {
                input: action.payload,
            }).pipe(
                graphqlRequestHandler(
                    (ajaxResponse) =>
                        createCategorySuccess(
                            ajaxResponse.response.data.categoryMutation
                                .createCategory
                        ),
                    () => createCategoryFailure()
                )
            )
        )
    );

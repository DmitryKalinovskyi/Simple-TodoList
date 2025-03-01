import { PayloadAction } from "@reduxjs/toolkit";
import { Action } from "redux";
import { Epic, ofType } from "redux-observable";
import { mergeMap } from "rxjs";
import { TodoListRootState } from "../../../../../state/store";
import apiRequest from "../../../../api/apiRequest";
import graphqlRequestHandler from "../../../../api/graphqlRequestHandler";
import {
    createCategory,
    createCategoryFailure,
    createCategorySuccess,
} from "../../state/categoriesSlice";
import { createCategoryMutation } from "../queries/createCategoryMutation";
import CreateCategoryInput from "@/models/CreateCategoryInput";

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

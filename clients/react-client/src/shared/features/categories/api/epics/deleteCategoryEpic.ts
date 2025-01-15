import { PayloadAction } from "@reduxjs/toolkit";
import { Action } from "redux";
import { Epic, ofType } from "redux-observable";
import { mergeMap } from "rxjs";
import { TodoListRootState } from "../../../../../state/store";
import apiRequest from "../../../../api/apiRequest";
import graphqlRequestHandler from "../../../../api/graphqlRequestHandler";
import {
    deleteCategory,
    deleteCategoryFailure,
    deleteCategorySuccess,
} from "../../state/categoriesSlice";
import { deleteCategoryMutation } from "../queries/deleteCategoryMutaion";

export const deleteCategoryEpic: Epic<Action, Action, TodoListRootState> = (
    action$
) =>
    action$.pipe(
        ofType(deleteCategory.type),
        mergeMap((action: PayloadAction<number>) =>
            apiRequest<any>(deleteCategoryMutation, {
                id: action.payload,
            }).pipe(
                graphqlRequestHandler(
                    () => deleteCategorySuccess(action.payload),
                    () => deleteCategoryFailure()
                )
            )
        )
    );

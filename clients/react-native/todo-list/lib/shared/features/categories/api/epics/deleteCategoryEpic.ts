import apiRequest from "@/lib/shared/api/apiRequest";
import graphqlRequestHandler from "@/lib/shared/api/graphqlRequestHandler";
import { TodoListRootState } from "@/lib/shared/state/store";
import { Action, PayloadAction } from "@reduxjs/toolkit";
import { Epic, ofType } from "redux-observable";
import { mergeMap } from "rxjs";
import { deleteCategory, deleteCategorySuccess, deleteCategoryFailure } from "../../state/categoriesSlice";
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

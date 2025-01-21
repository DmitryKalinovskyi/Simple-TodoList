import apiRequest from "@/lib/shared/api/apiRequest";
import graphqlRequestHandler from "@/lib/shared/api/graphqlRequestHandler";
import { appInit } from "@/lib/shared/state/actions";
import { TodoListRootState } from "@/lib/shared/state/store";
import { Action } from "@reduxjs/toolkit";
import { Epic, ofType } from "redux-observable";
import { switchMap } from "rxjs";
import {
    fetchCategories,
    fetchCategoriesSuccess,
    fetchCategoriesFailure,
} from "../../state/categoriesSlice";
import { categoriesQuery } from "../queries/categoriesQuery";

export const fetchCategoriesEpic: Epic<Action, Action, TodoListRootState> = (
    action$
) =>
    action$.pipe(
        ofType(fetchCategories.type),
        switchMap(() =>
            apiRequest<any>(categoriesQuery).pipe(
                graphqlRequestHandler(
                    (response) =>
                        fetchCategoriesSuccess(
                            response.data.categoryQuery.categories
                        ),
                    () => fetchCategoriesFailure()
                )
            )
        )
    );

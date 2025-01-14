import { Action } from "redux";
import { Epic, ofType } from "redux-observable";
import { switchMap } from "rxjs";
import apiRequest from "../../../../shared/api/apiRequest";
import graphqlRequestHandler from "../../../../shared/api/graphqlRequestHandler";
import { TodoListRootState } from "../../../../state/store";
import {
    fetchCategories,
    fetchCategoriesFailure,
    fetchCategoriesSuccess,
} from "../../state/categoriesSlice";
import { categoriesQuery } from "../queries/categoriesQuery";
import { updateProperties } from "../../../../shared/features/properties/state/propertiesSlice";
import { appInit } from "../../../../state/actions";

export const fetchCategoriesEpic: Epic<Action, Action, TodoListRootState> = (
    action$
) =>
    action$.pipe(
        ofType(appInit.type, fetchCategories.type, updateProperties.type),
        switchMap(() =>
            apiRequest<any>(categoriesQuery).pipe(
                graphqlRequestHandler(
                    (ajaxResponse) =>
                        fetchCategoriesSuccess(
                            ajaxResponse.response.data.categoryQuery.categories
                        ),
                    () => fetchCategoriesFailure()
                )
            )
        )
    );

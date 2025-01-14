import { Action } from "redux";
import { Epic, ofType } from "redux-observable";
import { switchMap } from "rxjs";
import { appInit } from "../../../../../state/actions";
import { TodoListRootState } from "../../../../../state/store";
import apiRequest from "../../../../api/apiRequest";
import graphqlRequestHandler from "../../../../api/graphqlRequestHandler";
import { updateAllSettings, updateSettings } from "../../../settings/state/settingsSlice";
import { fetchCategories, fetchCategoriesSuccess, fetchCategoriesFailure } from "../../state/categoriesSlice";
import { categoriesQuery } from "../queries/categoriesQuery";

export const fetchCategoriesEpic: Epic<Action, Action, TodoListRootState> = (
    action$
) =>
    action$.pipe(
        ofType(appInit.type, fetchCategories.type, updateAllSettings.type, updateSettings.type),
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

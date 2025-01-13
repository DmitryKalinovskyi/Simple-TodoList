import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CATEGORIES_QUERY} from "../api/categoriesRequests.ts";
import { client } from "../../../api/client.ts";
import Category from "../../../models/Category.ts";
import Task from "../../../models/Task.ts";

interface CategoriesState{
    categories: Category[]
}

// so the initial state is just load from the api all tasks.
// const initialState: TasksState = {tasks: []};
const result = (await client.query({
    query: CATEGORIES_QUERY,
    variables: {}
}));

const categories = result.data.categoryQuery.categories;

const initialState: CategoriesState = {
    categories
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        add_category: (state, action: PayloadAction<Task>) => {

        },
        remove_category: (state, action: PayloadAction<number>) => {
        },
    }
});

export const {add_category,remove_category} = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;
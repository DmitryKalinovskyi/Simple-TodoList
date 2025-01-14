import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Category from "../../../models/Category.ts";

interface CategoriesState {
    categories: Category[];
}

const initialState: CategoriesState = {
    categories: [],
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        fetchCategories: (state) => {},
        fetchCategoriesSuccess: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
        },
        fetchCategoriesFailure: (state) => {},

        addCategory: (state, action: PayloadAction<Category>) => {},
        addCategorySuccess: (state, action) => {},
        addCategoryFailure: (state, action) => {},

        removeCategory: (state, action: PayloadAction<number>) => {},
        removeCategorySuccess: (state, action) => {},
        removeCategoryFailure: (state, action) => {},
    },
});

export const {
    fetchCategories,
    fetchCategoriesSuccess,
    fetchCategoriesFailure,

    addCategory,
    addCategorySuccess,
    addCategoryFailure,

    removeCategory,
    removeCategorySuccess,
    removeCategoryFailure,
} = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;

import Category from "@/lib/models/Category";
import CreateCategoryInput from "@/lib/models/CreateCategoryInput";
import UpdateCategoryInput from "@/lib/models/UpdateCategoryInput";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CategoriesState {
    categories: Category[];
    operationCategory: Category | null,
    isUpdateCategoryModalOpen: boolean,
}

const initialState: CategoriesState = {
    categories: [],
    operationCategory: null,
    isUpdateCategoryModalOpen: false
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        fetchCategories: (_state) => {},
        fetchCategoriesSuccess: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
        },
        fetchCategoriesFailure: (_state) => {},

        createCategory: (
            _state,
            _action: PayloadAction<CreateCategoryInput>
        ) => {},
        createCategorySuccess: (state, action: PayloadAction<Category>) => {
            state.categories.push(action.payload);
        },
        createCategoryFailure: (_state) => {},

        updateCategory: (
            _state,
            _action: PayloadAction<UpdateCategoryInput>
        ) => {},
        updateCategorySuccess: (state, action: PayloadAction<Category>) => {
            console.log(action.payload)
            state.categories = state.categories.map((category) =>
                category.id === action.payload.id ? action.payload : category
            );
        },
        updateCategoryFailure: (_state) => {},

        deleteCategory: (_state, _action: PayloadAction<number>) => {},
        deleteCategorySuccess: (state, action: PayloadAction<number>) => {
            state.categories = state.categories.filter(category => category.id != action.payload);
        },
        deleteCategoryFailure: (_state) => {},

        showUpdateCategoryModal: (state, action: PayloadAction<Category>) => {
            state.operationCategory = action.payload;
            state.isUpdateCategoryModalOpen = true;
        },
        closeUpdateCategoryModal: (state) => {
            state.operationCategory = null;
            state.isUpdateCategoryModalOpen = false;
        }
    },
});

export const {
    fetchCategories,
    fetchCategoriesSuccess,
    fetchCategoriesFailure,

    createCategory,
    createCategorySuccess,
    createCategoryFailure,

    updateCategory,
    updateCategorySuccess,
    updateCategoryFailure,

    deleteCategory,
    deleteCategorySuccess,
    deleteCategoryFailure,

    showUpdateCategoryModal,
    closeUpdateCategoryModal
} = categoriesSlice.actions;

export const categoriesReducer = categoriesSlice.reducer;

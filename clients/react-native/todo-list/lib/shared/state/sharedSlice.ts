import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";

interface SharedState {
    isApplicationLoaded: boolean
}

const initialState: SharedState = {
    isApplicationLoaded: false
};

const sharedSlice = createSlice({
    name: "shared",
    initialState,
    reducers: {
        confirmApplicationLoad: (state) => {
            state.isApplicationLoaded = true;
        },
    },
});

export const {
    confirmApplicationLoad
} = sharedSlice.actions;

export const sharedReducer = sharedSlice.reducer;

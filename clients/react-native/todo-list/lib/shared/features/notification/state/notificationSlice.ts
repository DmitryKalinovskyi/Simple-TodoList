import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";

const initialState = {};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        notifyError: (state, action: PayloadAction<string>) => {
            // state.selectedDay = dayjs()
        },
    },
});

export const { notifyError } = notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";

interface ScheduleSlice {
    selectedDay: Date;
    isCalendarDayModalOpen: boolean;
}

const initialState: ScheduleSlice = {
    selectedDay: new Date(),
    isCalendarDayModalOpen: false,
};

const scheduleSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        showCalendarDayModal: (state, action: PayloadAction<Date>) => {
            state.selectedDay = action.payload;
            state.isCalendarDayModalOpen = true;
        },
        closeCalendarDayModal: (state) => {
            state.isCalendarDayModalOpen = false;
        },
        nextMonth: (state) => {
            // state.selectedDay = state.selectedDay.add(1, "month");
        },
        previousMonth: (state) => {
            // state.selectedDay = state.selectedDay.subtract(1, "month");
        },
        setToday: (state) => {
            // state.selectedDay = dayjs()
        },
    },
});

export const {
    showCalendarDayModal,
    closeCalendarDayModal,

    nextMonth,
    previousMonth,
    setToday,
} = scheduleSlice.actions;

export const scheduleReducer = scheduleSlice.reducer;

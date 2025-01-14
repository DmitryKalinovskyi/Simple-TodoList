import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";

interface SettingsState{
    storageType: StorageType,
    displayCompleted: boolean
}

export enum StorageType{
    SQLServer = "SQLServer",
    XML = "XML",
    PostgreSQL = "PostgreSQL"
}

const initialState: SettingsState = {
    storageType: StorageType.SQLServer,
    displayCompleted: false,
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        updateSettings: (_store, action: PayloadAction<SettingsState>) => {
            return action.payload;
        },
    }
});

export const {
    updateSettings, 
} = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
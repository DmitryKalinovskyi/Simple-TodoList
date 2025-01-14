import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";

interface SettingsState{
    storageType: StorageType,
    displayCompleted: boolean
    darkTheme: boolean,
    groupedTasks: boolean
}

interface SettingsChange<SettingsType>{
    key: string,
    value: SettingsType,
}

export enum StorageType{
    SQLServer = "SQLServer",
    XML = "XML",
    PostgreSQL = "PostgreSQL"
}

const initialState: SettingsState = {
    storageType: StorageType.SQLServer,
    displayCompleted: false,
    darkTheme: false,
    groupedTasks: false
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        updateAllSettings: (_state, action: PayloadAction<SettingsState>) => {
            return action.payload;
        },
        updateSettings: (state, action: PayloadAction<SettingsChange<any>>) => {
            return {
                ...state,
                [action.payload.key]: action.payload.value
            }
        }
    }
});

export const {
    updateAllSettings, 
    updateSettings
} = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
import { SETTINGS_STORAGE_KEY } from "../../../config";

export interface SettingsCollection{
    storageType: StorageType,
    displayCompleted: boolean
    darkTheme: boolean,
    groupedTasks: boolean,
    primaryColor: string
}

interface SettingsState{
    settingsCollection: SettingsCollection
    isSettingsModalOpen: boolean
}

export interface SettingsChange{
    key: keyof SettingsCollection,
    value: SettingsCollection[keyof SettingsCollection]
}

export enum StorageType{
    SQLServer = "SQLServer",
    XML = "XML",
    PostgreSQL = "PostgreSQL"
}

const getSettingsColletion = (): SettingsCollection => {
    const settingsCollectionJson = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (settingsCollectionJson === null) {
        return {
                storageType: StorageType.SQLServer,
                displayCompleted: false,
                darkTheme: false,
                groupedTasks: false,
                primaryColor: "#1677ff"
            };
    }
    
    return JSON.parse(settingsCollectionJson);
}

const initialState: SettingsState = {
    settingsCollection: getSettingsColletion(),
    isSettingsModalOpen: false,
}

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        updateAllSettings: (state, action: PayloadAction<SettingsCollection>) => {
            state.settingsCollection = action.payload;
        },
        updateSettings: (state, action: PayloadAction<SettingsChange>) => {
            return {
                ...state,
                settingsCollection: {
                    ...state.settingsCollection,
                    [action.payload.key]: action.payload.value
                }
            }
        },

        showSettingsModal: (state) => {
            state.isSettingsModalOpen = true
        },
        closeSettingsModal: (state) => {
            state.isSettingsModalOpen = false;
        }
    }
});

export const {
    updateAllSettings, 
    updateSettings,
    showSettingsModal,
    closeSettingsModal,
} = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
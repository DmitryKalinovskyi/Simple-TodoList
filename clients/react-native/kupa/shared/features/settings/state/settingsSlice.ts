import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";
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

const initialState: SettingsState = {
    settingsCollection:  {
        storageType: StorageType.SQLServer,
        displayCompleted: false,
        darkTheme: false,
        groupedTasks: false,
        primaryColor: "#1677ff"
    },
    isSettingsModalOpen: false,
}

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        initializeFromStorageSuccess: (state, action: PayloadAction<SettingsCollection>) => {
            state.settingsCollection = action.payload;
        },
        initializeFromStorageFailure: () => {
        },

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
    initializeFromStorageSuccess,
    initializeFromStorageFailure,
    updateAllSettings, 
    updateSettings,
    showSettingsModal,
    closeSettingsModal,
} = settingsSlice.actions;

export const settingsReducer = settingsSlice.reducer;
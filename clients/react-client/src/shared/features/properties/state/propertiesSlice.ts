import { createSlice, PayloadAction } from "@reduxjs/toolkit/react";

interface PropertiesState{
    storageType: StorageType
}

export enum StorageType{
    SQLServer = "SQLServer",
    XML = "XML",
    PostgreSQL = "PostgreSQL"
}


const initialState: PropertiesState = {
    storageType: StorageType.SQLServer
};

const propertiesSlice = createSlice({
    name: "properties",
    initialState,
    reducers: {
        updateProperties: (_store, action: PayloadAction<PropertiesState>) => {
            return action.payload;
        },
    }
});

export const {
    updateProperties, 
} = propertiesSlice.actions;

export const propertiesReducer = propertiesSlice.reducer;
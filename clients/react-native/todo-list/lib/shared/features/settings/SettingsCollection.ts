import { StorageType } from "./StorageType";

export interface SettingsCollection {
    storageType: StorageType;
    displayCompleted: boolean;
    darkTheme: boolean;
    groupedTasks: boolean;
    primaryColor: string;
    enableLiveUpdates: boolean;
}

import { store } from "../state/store";

export default function buildHeaders(){
    const storageType: string = store.getState().settings.settingsCollection.storageType;
    return {
        "Storage-Type": storageType
    }
}
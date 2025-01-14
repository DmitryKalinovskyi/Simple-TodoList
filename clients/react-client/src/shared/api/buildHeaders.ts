import { store } from "../../state/store";

export default function buildHeaders(){
    const storageType: string = store.getState().properties.storageType;
    return {
        "Storage-Type": storageType
    }
}
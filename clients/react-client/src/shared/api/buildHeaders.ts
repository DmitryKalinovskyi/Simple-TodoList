import { store } from "../../state/store";

export default function buildHeaders(){
    const storageType: string = store.getState().settings.storageType;
    return {
        "Storage-Type": storageType
    }
}
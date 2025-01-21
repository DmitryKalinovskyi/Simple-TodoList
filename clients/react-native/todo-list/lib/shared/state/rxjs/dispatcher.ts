import { tap } from "rxjs";
import { store } from "../store";
import { Action } from "@reduxjs/toolkit";

// dispatches all observable emitted actions to store.
export default function dispatcher(){
    return tap((action: Action) => store.dispatch(action));
}
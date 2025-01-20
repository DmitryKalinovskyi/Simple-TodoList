import { onCreateTask } from "../features/todo/api/subscription/onCreateTask";

export default function configureSubscriptions(){
    onCreateTask().subscribe();
}
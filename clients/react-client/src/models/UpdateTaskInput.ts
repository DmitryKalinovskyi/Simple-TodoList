import Category from "./Category.ts";

export type UpdateTaskInput = {
    id: number,
    task: {
        name?: string,
        deadline?: string,
        isCompleted?: boolean,
        category?: Category
    }
}
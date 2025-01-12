import Category from "./Category.ts";

export default interface Task{
    id: number,
    name: string,
    deadline?: string,
    category?: Category,
    // categoryId?: number,
    isCompleted: boolean
}
import Category from "./Category.js";

export default interface Task{
    id: number,
    name: string,
    deadline?: string,
    category?: Category,
    // categoryId?: number,
    isCompleted: boolean
}
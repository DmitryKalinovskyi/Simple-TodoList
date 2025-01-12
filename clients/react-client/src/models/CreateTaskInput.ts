export type CreateTaskInput = {
    name: string,
    isCompleted: boolean,
    deadline?: string,
    categoryId?: number
}
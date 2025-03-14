export type UpdateTaskInput = {
    id: number,
    name?: string,
    deadline?: string | null,
    isCompleted?: boolean,
    categoryId?: number | null,
}
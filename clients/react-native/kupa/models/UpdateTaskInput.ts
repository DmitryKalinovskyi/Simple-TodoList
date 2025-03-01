export default interface UpdateTaskInput {
    id: number,
    name?: string,
    deadline?: string | null,
    isCompleted?: boolean,
    categoryId?: number | null,
}
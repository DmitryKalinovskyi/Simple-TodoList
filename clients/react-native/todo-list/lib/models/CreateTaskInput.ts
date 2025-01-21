export default interface CreateTaskInput {
    id: number;
    name: string,
    isCompleted: boolean,
    deadline?: string,
    categoryId?: number
}
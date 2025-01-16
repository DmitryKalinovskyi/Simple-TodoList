import { Dayjs } from "dayjs"

export default interface CreateTaskInput {
    name: string,
    isCompleted: boolean,
    deadline?: string | Dayjs | Date,
    categoryId?: number
}
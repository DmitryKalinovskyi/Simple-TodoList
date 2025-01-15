import { Dayjs } from "dayjs"

export type CreateTaskInput = {
    name: string,
    isCompleted: boolean,
    deadline?: string | Dayjs | Date,
    categoryId?: number
}
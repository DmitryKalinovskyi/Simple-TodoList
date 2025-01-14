export const tasksQuery = `
query TaskQuery{
    taskQuery{
        tasks{
            id,
            name,
            deadline,
            isCompleted,
            category{
                id,
                name
            }
        }
    }
}
`;
import { gql } from "@apollo/client";

export const TASKS_QUERY = gql`
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
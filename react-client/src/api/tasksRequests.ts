import {gql} from "@apollo/client";

const TASKS_QUERY = gql`
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

const CREATE_TASK = gql`
mutation CreateTask($task: TaskInputType!){
  taskMutation{
    createTask(task: $task){
      id,
      category{
        id,
        name
      }
    }
  }
}`

const UPDATE_TASK = gql`
mutation UpdateTask($id: Int!, $task: TaskInputType!){
  taskMutation{
    updateTask(id: $id, task: $task){id}
  }
}
`;

const DELETE_TASK = gql`
mutation DeleteTask($id: Int!){
  taskMutation{
    deleteTask(id: $id)
  }
}
`

export {TASKS_QUERY, CREATE_TASK, UPDATE_TASK, DELETE_TASK}
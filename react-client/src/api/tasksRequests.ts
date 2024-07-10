import {gql} from "@apollo/client";

const TASKS_QUERY = gql`
query TaskQuery{
    taskQuery{
        tasks{
            id,
            name,
            deadline,
            isCompleted
        }
    }
}
`;

const CREATE_TASK = gql`
mutation CreateTask($task: TaskInputType!){
  taskMutation{
    createTask(task: $task){
      id
    }
  }
}`

const UPDATE_TASK = gql`
mutation UpdateTask($id: Int!, $task: TaskInputType!){
  taskMutation{
    updateTask(id: $id, task: $task){name}
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
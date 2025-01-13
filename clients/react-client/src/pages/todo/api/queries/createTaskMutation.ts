import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
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
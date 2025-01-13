import { gql } from "@apollo/client";

export const DELETE_TASK = gql`
mutation DeleteTask($id: Int!){
  taskMutation{
    deleteTask(id: $id)
  }
}
`
export const deleteTaskMutation = `
mutation DeleteTask($id: Int!){
  taskMutation{
    deleteTask(id: $id)
  }
}
`
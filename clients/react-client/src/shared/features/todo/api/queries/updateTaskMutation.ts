export const updateTaskMutation = `
mutation UpdateTask($input: UpdateTaskInputType!){
  taskMutation{
    updateTask(input: $input){
      id,
      name,
      isCompleted,
      deadline,
      category{
        id,
        name
      }
    }
  }
}
`;
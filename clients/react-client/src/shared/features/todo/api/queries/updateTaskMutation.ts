export const updateTaskMutation = `
mutation UpdateTask($id: Int!, $task: TaskInputType!){
  taskMutation{
    updateTask(id: $id, task: $task){id}
  }
}
`;
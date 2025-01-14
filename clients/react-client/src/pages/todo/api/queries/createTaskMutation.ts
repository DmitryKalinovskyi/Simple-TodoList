export const createTaskMutation = `
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
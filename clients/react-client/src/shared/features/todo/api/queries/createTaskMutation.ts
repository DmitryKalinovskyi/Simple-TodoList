export const createTaskMutation = `
mutation CreateTask($input: CreateTaskInputType!){
  taskMutation{
    createTask(input: $input){
      id,
      category{
        id,
        name
      }
    }
  }
}`
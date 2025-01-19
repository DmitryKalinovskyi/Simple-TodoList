using GraphQL;
using GraphQL.Types;
using Newtonsoft.Json;
using Simple_TodoList.GraphQL.Errors;
using Simple_TodoList.GraphQL.Tasks;
using Simple_TodoList.GraphQL.Tasks.Input;
using Simple_TodoList.GraphQL.Tasks.Services;
using Simple_TodoList.Models;
using Simple_TodoList.Repositories;

namespace Simple_TodoList.GraphQL.Todos
{
    public class TaskMutation : ObjectGraphType
    {
        public TaskMutation(ITasksRepository tasksRepository, ITaskEventHandler taskEventHandler)
        {
            Field<TaskType>("createTask")
                .Argument<CreateTaskInputType>("input")
                .ResolveAsync(async (context) =>
            {
                var task = context.GetArgument<TaskModel>("input");
                var result = await tasksRepository.Insert(task) ??
                    throw new InvalidOperationException("Failed to get created task.");

                taskEventHandler.CreatedTaskStream.OnNext(result);
                return result;
            });

            Field<TaskType>("updateTask")
                .Argument<UpdateTaskInputType>("input")
                .ResolveAsync(async (context) =>
            {
                var inputTask = context.GetArgument<TaskModel>("input");
                var taskDb = await tasksRepository.GetById(inputTask.Id) 
                ?? throw new NotFoundExecutionError($"{nameof(TaskModel)} with given id is not found.");

                // Convert to object with dynamic fields,
                var dynamicTask = context.GetArgument<dynamic>("input");
                var json = JsonConvert.SerializeObject(dynamicTask);
                 
                JsonConvert.PopulateObject(json, taskDb);

                await tasksRepository.Update(inputTask.Id, taskDb);
                taskEventHandler.UpdatedTaskStream.OnNext(taskDb);
                return taskDb;
            });

            Field<StringGraphType>("deleteTask")
                .Argument<IntGraphType>("id")
                .ResolveAsync(async (context) =>
                {
                    var id = context.GetArgument<int>("id");
                    await tasksRepository.Delete(id);
                    taskEventHandler.DeletedTaskStream.OnNext(id);
                    return "Ok";
                });
        }
    }
}

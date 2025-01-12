using GraphQL;
using GraphQL.Types;
using Newtonsoft.Json;
using Simple_TodoList.GraphQL.Tasks;
using Simple_TodoList.Models;
using Simple_TodoList.Repositories;

namespace Simple_TodoList.GraphQL.Todos
{
    public class TaskMutation : ObjectGraphType
    {
        public TaskMutation(ITasksRepository tasksRepository)
        {
            Field<TaskType>("createTask")
                .Argument<TaskInputType>("task")
                .ResolveAsync(async (context) =>
            {
                var task = context.GetArgument<TaskModel>("task");
                return await tasksRepository.Insert(task);
            });

            Field<TaskType>("updateTask")
                .Argument<IntGraphType>("id")
                .Argument<TaskInputType>("task")
                .ResolveAsync(async (context) =>
            {
                var id = context.GetArgument<int>("id");
                var taskDb = await tasksRepository.GetById(id);
                if (taskDb == null) return null;

                // Convert to object with dynamic fields,
                // then to json and after update database entity based on that info
                var task = context.GetArgument<dynamic>("task");
                var json = JsonConvert.SerializeObject(task);
                JsonConvert.PopulateObject(json, taskDb);

                await tasksRepository.Update(id, taskDb);

                return taskDb;
            });

            Field<StringGraphType>("deleteTask")
                .Argument<IntGraphType>("id")
                .ResolveAsync(async (context) =>
                {
                    var id = context.GetArgument<int>("id");
                    await tasksRepository.Delete(id);
                    return "Ok";
                });
        }
    }
}

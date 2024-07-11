using GraphQL;
using GraphQL.Types;
using Newtonsoft.Json;
using Simple_TodoList.GraphQL.InputTypes;
using Simple_TodoList.GraphQL.Types;
using Simple_TodoList.Models;
using Simple_TodoList.Repositories;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

namespace Simple_TodoList.GraphQL.Mutation
{
    public class TaskMutation: ObjectGraphType
    {
        public TaskMutation(ITasksRepository tasksRepository)
        {
            Field<TaskType>("createTask").Arguments(new QueryArgument<NonNullGraphType<TaskInputType>> {Name="task"}).ResolveAsync(async (context) => 
            {
                var task = context.GetArgument<TaskModel>("task");


                return await tasksRepository.Insert(task);
            });

            Field<TaskType>("updateTask")
                .Arguments(new QueryArgument<NonNullGraphType<IntGraphType>> { Name="id" },
                new QueryArgument<NonNullGraphType<TaskInputType>> { Name = "task" })
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
                .Arguments(new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "id" })
                .ResolveAsync(async (context) =>
                {
                    var id = context.GetArgument<int>("id");
                    await tasksRepository.Delete(id);
                    return "Ok";
                });
        }
    }
}

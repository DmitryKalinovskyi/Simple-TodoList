using GraphQL;
using GraphQL.Types;
using Simple_TodoList.GraphQL.InputTypes;
using Simple_TodoList.GraphQL.Types;
using Simple_TodoList.Models;
using Simple_TodoList.Repositories;
using System.Diagnostics.CodeAnalysis;

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
                var task = context.GetArgument<TaskModel>("task");

                await tasksRepository.Update(id, task);

                return await tasksRepository.GetById(id);
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

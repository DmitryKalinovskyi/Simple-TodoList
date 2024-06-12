using GraphQL;
using GraphQL.Types;
using Simple_TodoList.Factories;
using Simple_TodoList.GraphQL.Types;
using Simple_TodoList.Models;
using Simple_TodoList.Repositories;

namespace Simple_TodoList.GraphQL.Queries
{
    public class TaskQuery: ObjectGraphType
    {
        public TaskQuery()
        {
            Field<ListGraphType<TaskType>>("tasks").Resolve(context =>
            {
                return new List<TaskModel>();
            });

            Field<TaskType>("task").Arguments(new QueryArguments(new QueryArgument<IntGraphType> { Name = "taskId" })).Resolve(context =>
            {
                var id = context.GetArgument<int>("taskId");

                return new TaskModel { Id = id, Name = "Task " + id, IsCompleted = false };
            });
        }

        //public TaskQuery(IRepositoryResolver repositoryResolver)
        //{
        //    Field<ListGraphType<TaskType>>("Tasks").ResolveAsync(async (context) =>
        //    {
        //        return await repositoryResolver.GetTasksRepository().GetAll();
        //    });

        //    Field<TaskType>("Task").Arguments(new QueryArguments(new QueryArgument<IntGraphType> { Name = "taskId" })).ResolveAsync(async (context) =>
        //    {
        //        return await repositoryResolver.GetTasksRepository().GetById(context.GetArgument<int>("taskId"));
        //    });
        //}
    }
}

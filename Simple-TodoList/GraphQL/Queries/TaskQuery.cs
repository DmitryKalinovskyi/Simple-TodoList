using GraphQL;
using GraphQL.Types;
using Simple_TodoList.GraphQL.Types;
using Simple_TodoList.Repositories;

namespace Simple_TodoList.GraphQL.Queries
{
    public class TaskQuery : ObjectGraphType
    {
        public TaskQuery(ITasksRepository tasksRepository)
        {
            Field<ListGraphType<TaskType>>("tasks").ResolveAsync(async (context) =>
            {
                return await tasksRepository.GetAllWithStandartOrdering();
            });

            Field<TaskType>("task").Arguments(new QueryArguments(new QueryArgument<IntGraphType> { Name = "taskId" })).ResolveAsync(async (context) =>
            {
                var id = context.GetArgument<int>("taskId");
                
                return await tasksRepository.GetById(id);
            });
        }
    }
}

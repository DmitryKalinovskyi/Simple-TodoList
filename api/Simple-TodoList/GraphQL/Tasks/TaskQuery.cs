using GraphQL;
using GraphQL.Types;
using Simple_TodoList.Repositories;

namespace Simple_TodoList.GraphQL.Tasks
{
    public class TaskQuery : ObjectGraphType
    {
        public TaskQuery(ITasksRepository tasksRepository)
        {
            Field<ListGraphType<TaskType>>("tasks")
                .ResolveAsync(async (context) =>
            {
                return await tasksRepository.GetAllWithStandartOrdering();
            });

            Field<TaskType>("task")
                .Argument<IntGraphType>("id")
                .ResolveAsync(async (context) =>
            {
                var id = context.GetArgument<int>("id");

                return await tasksRepository.GetById(id);
            });
        }
    }
}

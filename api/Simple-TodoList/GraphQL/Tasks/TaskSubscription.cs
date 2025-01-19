using GraphQL.Types;
using Simple_TodoList.GraphQL.Tasks.Services;
using Simple_TodoList.Models;

namespace Simple_TodoList.GraphQL.Tasks
{
    public class TaskSubscription: ObjectGraphType
    {
        public TaskSubscription(ITaskEventHandler taskEventHandler)
        {
            Field<TaskType, TaskModel>("onTaskCreated")
                .ResolveStream(context => taskEventHandler.CreatedTaskStream);

            Field<TaskType, TaskModel>("onTaskUpdated")
                .ResolveStream(context => taskEventHandler.UpdatedTaskStream);

            Field<IntGraphType, int>("onTaskDeleted")
                .ResolveStream(context => taskEventHandler.DeletedTaskStream);
        }
    }
}

using GraphQL.Types;
using Simple_TodoList.Models;

namespace Simple_TodoList.GraphQL.Types
{
    public class TaskType: ObjectGraphType<TaskModel>
    {
        public TaskType() 
        {
            Field(t => t.Id);
            Field(t => t.Name);
            Field(t => t.IsCompleted);
            Field(t => t.Deadline);
            Field(t => t.CategoryId);
        }
    }
}

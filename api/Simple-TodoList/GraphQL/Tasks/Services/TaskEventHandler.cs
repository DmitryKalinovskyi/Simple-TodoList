using Simple_TodoList.Models;
using System.Reactive.Subjects;

namespace Simple_TodoList.GraphQL.Tasks.Services
{
    public class TaskEventHandler : ITaskEventHandler
    {
        public Subject<TaskModel> CreatedTaskStream { get; set; } = new Subject<TaskModel>();
        public Subject<TaskModel> UpdatedTaskStream { get; set; } = new Subject<TaskModel>();
        public Subject<int> DeletedTaskStream { get; set; } = new Subject<int>();
    }
}

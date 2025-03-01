using Simple_TodoList.Models;
using System.Reactive.Subjects;

namespace Simple_TodoList.GraphQL.Tasks.Services
{
    public interface ITaskEventHandler
    {
        Subject<TaskModel> CreatedTaskStream { get; set; }
        Subject<TaskModel> UpdatedTaskStream { get; set; }
        Subject<int> DeletedTaskStream { get; set; }
    }
}
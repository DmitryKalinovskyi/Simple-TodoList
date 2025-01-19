using Simple_TodoList.Models;
using System.Reactive.Subjects;

namespace Simple_TodoList.GraphQL.Categories.Services
{
    public interface ICategoryEventHandler
    {
        Subject<CategoryModel> OnCategoryCreated { get; set; }
        Subject<int> OnCategoryDeleted { get; set; }
        Subject<CategoryModel> OnCategoryUpdated { get; set; }
    }
}
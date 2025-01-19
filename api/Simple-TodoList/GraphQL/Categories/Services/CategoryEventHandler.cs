using Simple_TodoList.Models;
using System.Reactive.Subjects;

namespace Simple_TodoList.GraphQL.Categories.Services
{
    public class CategoryEventHandler : ICategoryEventHandler
    {
        public Subject<CategoryModel> OnCategoryCreated { get; set; } = new Subject<CategoryModel>();
        public Subject<CategoryModel> OnCategoryUpdated { get; set; } = new Subject<CategoryModel>();
        public Subject<int> OnCategoryDeleted { get; set; } = new Subject<int>();
    }
}

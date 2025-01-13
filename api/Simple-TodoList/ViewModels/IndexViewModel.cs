using Simple_TodoList.Dependency.Repositories.RepositoryResolvers;
using Simple_TodoList.Models;

namespace Simple_TodoList.ViewModels
{
    public class IndexViewModel
    {
        public List<TaskModel> Tasks { get; set; } = [];

        public List<CategoryModel> Categories { get; set; } = [];

        public CreateTaskViewModel Task { get; set; } = new();

        public StorageType StorageType { get; set; }
    }
}

using Simple_TodoList.Models;
using Simple_TodoList.Services.Storage;

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

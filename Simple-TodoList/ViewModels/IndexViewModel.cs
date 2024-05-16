using Simple_TodoList.Models;

namespace Simple_TodoList.ViewModels
{
    public class IndexViewModel
    {
        public List<TaskModel> Tasks { get; set; } = [];

        public List<CategoryModel> Categories { get; set; } = [];
    }
}

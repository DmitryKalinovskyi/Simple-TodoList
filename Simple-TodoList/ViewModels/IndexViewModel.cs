using Simple_TodoList.Models;

namespace Simple_TodoList.ViewModels
{
    public class IndexViewModel
    {
        public IEnumerable<Models.TaskModel> Tasks { get; set; } = [];

        public IEnumerable<CategoryModel> Categories { get; set; } = [];
    }
}

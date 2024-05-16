
namespace Simple_TodoList.Models
{
    public class TaskModel
    {
        public int Id { get; set; }

        public string Name { get; set; } = ""; 

        public bool IsCompleted { get; set; } 
        
        public DateTime? Deadline { get; set; }

        public int? CategoryId { get; set; }
    }
}

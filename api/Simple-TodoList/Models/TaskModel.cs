
using System.ComponentModel.DataAnnotations;

namespace Simple_TodoList.Models
{
    public class TaskModel
    {
        public int Id { get; set; }

        public string Name { get; set; } = String.Empty; 

        public bool IsCompleted { get; set; } 
        
        public DateTimeOffset? Deadline { get; set; }

        public int? CategoryId { get; set; }
    }
}

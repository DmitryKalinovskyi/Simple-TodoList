
using System.ComponentModel.DataAnnotations;

namespace Simple_TodoList.Models
{
    public class TaskModel
    {
        public int Id { get; set; }

        [Required]
        [MinLength(1)]
        public string Name { get; set; } = String.Empty; 

        public bool IsCompleted { get; set; } 
        
        public DateTime? Deadline { get; set; }

        public int? CategoryId { get; set; }
    }
}

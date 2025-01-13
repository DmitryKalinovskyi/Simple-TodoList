using System.ComponentModel.DataAnnotations;

namespace Simple_TodoList.ViewModels
{
    public class CreateTaskViewModel
    {
        [Required]
        [MinLength(1)]
        public string Name { get; set; } = String.Empty;
        public DateTime? Deadline { get; set; }
        public int? CategoryId { get; set; }
    }
}

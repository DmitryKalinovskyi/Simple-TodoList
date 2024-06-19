using GraphQL.Types;
using Simple_TodoList.Factories;
using Simple_TodoList.Models;
using Simple_TodoList.Repositories;

namespace Simple_TodoList.GraphQL.Types
{
    public class TaskType: ObjectGraphType<TaskModel>
    {
        public TaskType(ICategoriesRepository categoriesRepository) 
        {
            Field(t => t.Id);
            Field(t => t.Name);
            Field(t => t.IsCompleted);
            Field(t => t.Deadline, nullable: true, typeof(DateTimeGraphType));
            Field<CategoryType>("category").ResolveAsync(async (context) =>
            {
                var task = context.Source;
                var categories = await categoriesRepository.GetAll();

                return categories.FirstOrDefault(category => category.Id == task.CategoryId);
            });
        }
    }
}

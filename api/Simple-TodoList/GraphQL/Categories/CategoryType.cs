using GraphQL.Types;
using Simple_TodoList.Models;

namespace Simple_TodoList.GraphQL.Categories
{
    public class CategoryType : ObjectGraphType<CategoryModel>
    {
        public CategoryType()
        {
            Field(c => c.Id);
            Field(c => c.Name);
        }
    }
}

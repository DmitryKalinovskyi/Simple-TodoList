using GraphQL.Types;

namespace Simple_TodoList.GraphQL.Categories
{
    public class CategoryInputType : InputObjectGraphType
    {
        public CategoryInputType()
        {
            Field<StringGraphType>("name");
        }
    }
}

using GraphQL.Types;

namespace Simple_TodoList.GraphQL.Categories.Input
{
    public class CreateCategoryInputType : InputObjectGraphType
    {
        public CreateCategoryInputType()
        {
            Field<StringGraphType>("name");
        }
    }
}

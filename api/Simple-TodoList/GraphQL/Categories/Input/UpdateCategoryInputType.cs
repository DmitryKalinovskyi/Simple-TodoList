using GraphQL.Types;

namespace Simple_TodoList.GraphQL.Categories.Input
{
    public class UpdateCategoryInputType : InputObjectGraphType
    {
        public UpdateCategoryInputType()
        {
            Field<IntGraphType>("id");
            Field<StringGraphType>("name");
        }
    }
}

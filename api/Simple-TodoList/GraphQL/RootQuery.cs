using GraphQL.Types;
using Simple_TodoList.GraphQL.Categories;
using Simple_TodoList.GraphQL.Tasks;

namespace Simple_TodoList.GraphQL
{
    public class RootQuery : ObjectGraphType
    {
        public RootQuery()
        {
            Field<TaskQuery>("taskQuery").Resolve(context => new { });
            Field<CategoryQuery>("categoryQuery").Resolve(context => new { });
        }
    }
}

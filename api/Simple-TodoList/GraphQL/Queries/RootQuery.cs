using GraphQL.Types;

namespace Simple_TodoList.GraphQL.Queries
{
    public class RootQuery: ObjectGraphType
    {
        public RootQuery()
        {
            Field<TaskQuery>("taskQuery").Resolve(context => new { });
            Field<CategoryQuery>("categoryQuery").Resolve(context => new { });
        }
    }
}

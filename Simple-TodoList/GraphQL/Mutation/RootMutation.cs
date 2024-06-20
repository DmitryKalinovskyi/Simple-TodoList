using GraphQL.Types;

namespace Simple_TodoList.GraphQL.Mutation
{
    public class RootMutation: ObjectGraphType
    {
        public RootMutation()
        {
            Field<TaskMutation>("taskMutation").Resolve(context => new { });
            Field<CategoryMutation>("categoryMutation").Resolve(context => new { });
        }
    }
}

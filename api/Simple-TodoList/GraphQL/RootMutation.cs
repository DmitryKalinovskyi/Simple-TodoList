using GraphQL.Types;
using Simple_TodoList.GraphQL.Categories;
using Simple_TodoList.GraphQL.Todos;

namespace Simple_TodoList.GraphQL
{
    public class RootMutation : ObjectGraphType
    {
        public RootMutation()
        {
            Field<TaskMutation>("taskMutation").Resolve(context => new { });
            Field<CategoryMutation>("categoryMutation").Resolve(context => new { });
        }
    }
}

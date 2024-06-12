using Simple_TodoList.GraphQL.Queries;
using GraphQLTypes = GraphQL.Types;

namespace Simple_TodoList.GraphQL.Schema
{
    public class TaskSchema: GraphQLTypes.Schema
    {
        public TaskSchema(TaskQuery taskQuery)
        {
            Query = taskQuery;
        }
    }
}

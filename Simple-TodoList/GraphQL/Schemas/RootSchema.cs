using Simple_TodoList.GraphQL.Queries;
using GraphQLTypes = GraphQL.Types;

namespace Simple_TodoList.GraphQL.Schemas
{
    public class RootSchema: GraphQLTypes.Schema
    {
        public RootSchema(IServiceProvider serviceProvider): base(serviceProvider)
        {
            Query = serviceProvider.GetRequiredService<RootQuery>();
        }
    }
}

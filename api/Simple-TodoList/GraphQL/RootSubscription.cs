using GraphQL.Resolvers;
using GraphQL.Types;
using Simple_TodoList.GraphQL.Tasks;
using Simple_TodoList.GraphQL.Todos;

namespace Simple_TodoList.GraphQL
{
    public class RootSubscription: ObjectGraphType
    {
        public RootSubscription(IServiceProvider serviceProvider)
        {
            List<TypeFields> allTypeFields = [
                serviceProvider.GetRequiredService<TaskSubscription>().Fields
                ];

            foreach(var typeFields in allTypeFields)
            {
                foreach(var field in typeFields)
                {
                    AddField(field);
                }
            }
        }
    }
}

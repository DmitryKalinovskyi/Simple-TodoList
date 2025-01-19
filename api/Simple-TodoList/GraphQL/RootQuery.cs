using GraphQL.Types;
using Simple_TodoList.GraphQL.Categories;
using Simple_TodoList.GraphQL.Tasks;

namespace Simple_TodoList.GraphQL
{
    public class RootQuery : ObjectGraphType
    {
        public RootQuery(IServiceProvider serviceProvider)
        {
            Field<TaskQuery>("taskQuery").Resolve(context => serviceProvider.GetRequiredService<TaskQuery>());
            Field<CategoryQuery>("categoryQuery").Resolve(context => serviceProvider.GetRequiredService<CategoryQuery>());
        }
    }
}

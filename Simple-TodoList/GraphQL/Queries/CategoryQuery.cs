using GraphQL;
using GraphQL.Types;
using Simple_TodoList.GraphQL.Types;
using Simple_TodoList.Repositories;

namespace Simple_TodoList.GraphQL.Queries
{
    public class CategoryQuery : ObjectGraphType
    {
        public CategoryQuery(ICategoriesRepository categoriesRepository)
        {
            Field<ListGraphType<CategoryType>>("categories").ResolveAsync(async (context) =>
            {
                return await categoriesRepository.GetAll();
            });

            Field<CategoryType>("category").Arguments(new QueryArguments(new QueryArgument<IntGraphType> { Name = "categoryId" })).ResolveAsync(async (context) =>
            {
                var id = context.GetArgument<int>("categoryId");

                return await categoriesRepository.GetById(id);
            });
        }
    }
}

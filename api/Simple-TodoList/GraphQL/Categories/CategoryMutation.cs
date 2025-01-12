using GraphQL;
using GraphQL.Types;
using Simple_TodoList.GraphQL.Tasks;
using Simple_TodoList.Models;
using Simple_TodoList.Repositories;
using Simple_TodoList.Repositories.SQLRepositories;

namespace Simple_TodoList.GraphQL.Categories
{
    public class CategoryMutation : ObjectGraphType
    {
        public CategoryMutation(ICategoriesRepository categoriesRepository)
        {
            Field<CategoryType>("createCategory")
                .Argument<CategoryInputType>("category")
                .ResolveAsync(async (context) =>
            {
                return await categoriesRepository.Insert(context.GetArgument<CategoryModel>("category"));
            });

            Field<TaskType>("updateCategory")
                .Argument<IntGraphType>("id")
                .Argument<CategoryInputType>("category")
                .ResolveAsync(async (context) =>
                {
                    var id = context.GetArgument<int>("id");
                    var category = context.GetArgument<CategoryModel>("category");
                    await categoriesRepository.Update(id, category);

                    return await categoriesRepository.GetById(id);
                });

            Field<StringGraphType>("deleteCategory")
                .Argument<IntGraphType>("id")
                .ResolveAsync(async (context) =>
                {
                    var id = context.GetArgument<int>("id");
                    await categoriesRepository.Delete(id);
                    return "Ok";
                });
        }
    }
}

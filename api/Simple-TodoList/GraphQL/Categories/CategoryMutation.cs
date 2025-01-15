using GraphQL;
using GraphQL.Types;
using Simple_TodoList.GraphQL.Categories.Input;
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
                .Argument<CreateCategoryInputType>("input")
                .ResolveAsync(async (context) =>
            {
                return await categoriesRepository.Insert(context.GetArgument<CategoryModel>("input"));
            });

            Field<CategoryType>("updateCategory")
                .Argument<UpdateCategoryInputType>("input")
                .ResolveAsync(async (context) =>
                {
                    var input = context.GetArgument<CategoryModel>("input");
                    await categoriesRepository.Update(input.Id, input);

                    return await categoriesRepository.GetById(input.Id);
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

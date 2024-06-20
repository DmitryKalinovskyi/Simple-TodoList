using GraphQL;
using GraphQL.Types;
using Simple_TodoList.GraphQL.InputTypes;
using Simple_TodoList.GraphQL.Types;
using Simple_TodoList.Models;
using Simple_TodoList.Repositories;
using Simple_TodoList.Repositories.SQLRepositories;

namespace Simple_TodoList.GraphQL.Mutation
{
    public class CategoryMutation: ObjectGraphType
    {
        public CategoryMutation(ICategoriesRepository categoriesRepository)
        {
            Field<CategoryType>("createCategory")
                .Arguments(new QueryArgument<CategoryInputType> { Name = "category" })
                .ResolveAsync(async (context) =>
            {
                return await categoriesRepository.Insert(context.GetArgument<CategoryModel>("category"));
            });

            Field<TaskType>("updateCategory")
                .Arguments(new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "id" },
                new QueryArgument<NonNullGraphType<CategoryInputType>> { Name = "category" })
                .ResolveAsync(async (context) =>
                {
                    var id = context.GetArgument<int>("id");
                    var category = context.GetArgument<CategoryModel>("category");
                    await categoriesRepository.Update(id, category);

                    return await categoriesRepository.GetById(id);
                });

            Field<StringGraphType>("deleteCategory")
                .Arguments(new QueryArgument<NonNullGraphType<IntGraphType>> { Name = "id" })
                .ResolveAsync(async (context) =>
                {
                    var id = context.GetArgument<int>("id");
                    await categoriesRepository.Delete(id);
                    return "Ok";
                });
        }
    }
}

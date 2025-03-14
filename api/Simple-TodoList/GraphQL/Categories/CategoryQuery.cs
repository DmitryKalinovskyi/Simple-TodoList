﻿using GraphQL;
using GraphQL.Types;
using Simple_TodoList.Repositories;

namespace Simple_TodoList.GraphQL.Categories
{
    public class CategoryQuery : ObjectGraphType
    {
        public CategoryQuery(ICategoriesRepository categoriesRepository)
        {
            Field<ListGraphType<CategoryType>>("categories")
                .ResolveAsync(async (context) =>
            {
                return await categoriesRepository.GetAll();
            });

            Field<CategoryType>("category")
                .Argument<IntGraphType>("id")
                .ResolveAsync(async (context) =>
            {
                var id = context.GetArgument<int>("id");

                return await categoriesRepository.GetById(id);
            });
        }
    }
}

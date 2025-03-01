using GraphQL.Types;
using Simple_TodoList.GraphQL.Categories.Services;
using Simple_TodoList.Models;

namespace Simple_TodoList.GraphQL.Categories
{
    public class CategorySubscription: ObjectGraphType
    {
        public CategorySubscription(ICategoryEventHandler eventHandler)
        {
            Field<CategoryType, CategoryModel>("onCategoryCreated")
                .ResolveStream(context => eventHandler.OnCategoryCreated);

            Field<CategoryType, CategoryModel>("onCategoryUpdated")
                .ResolveStream(context => eventHandler.OnCategoryUpdated);

            Field<CategoryType, int>("onCategoryDeleted")
                .ResolveStream(context => eventHandler.OnCategoryDeleted);
        }
    }
}

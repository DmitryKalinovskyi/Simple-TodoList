using GraphQL.Types;
using GraphQL.DI;
using Simple_TodoList.Factories;
using Simple_TodoList.GraphQL.Types;
using Simple_TodoList.Repositories;
using GraphQL;
using Simple_TodoList.GraphQL.Queries;
using GraphQL.SystemTextJson;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

namespace Simple_TodoList.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddRepositoryResolvers(this IServiceCollection services)
        {
            services.AddTransient((provider) =>
            {
                var resolver = provider.GetRequiredService<IRepositoryResolver>();
                return resolver.GetTasksRepository();
            });

            services.AddTransient((provider) =>
            {
                var resolver = provider.GetRequiredService<IRepositoryResolver>();
                return resolver.GetCategoriesRepository();
            });

            return services;
        }

        public static IServiceCollection AddGraphQLServices(this IServiceCollection services)
        {

            // add graphql types
            //services.AddTransient<CategoryType>()
            //    .AddTransient<TaskType>();

            //// add queries
            //services.AddTransient<TaskQuery>();

            //services.AddTransient<ISchema, TaskSchema>();

            //// add execution components
            //services.AddGraphQL(builder => builder
            //    .AddAutoSchema<ISchema>()
            //    .AddSystemTextJson()
            //    //.AddGraphTypes(typeof(TaskSchema).Assembly)
            //);



            return services;
        }
    }
}

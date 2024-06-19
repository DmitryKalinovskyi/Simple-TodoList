using GraphQL.Types;
using GraphQL.DI;
using Simple_TodoList.GraphQL.Types;
using Simple_TodoList.Repositories;
using GraphQL;
using Simple_TodoList.GraphQL.Queries;
using GraphQL.SystemTextJson;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Simple_TodoList.Factories.RepositoryResolvers;

namespace Simple_TodoList.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddRepositoryResolvers(this IServiceCollection services)
        {
            services.AddScoped<HeaderBasedRepositoryResolver>();
            services.AddScoped<SessionBasedRepositoryResolver>();

            services.AddTransient<IRepositoryResolver>(provider =>
            {
                var httpContextAccessor = provider.GetRequiredService<IHttpContextAccessor>();
                var httpContext = httpContextAccessor.HttpContext;
                    return provider.GetRequiredService<HeaderBasedRepositoryResolver>();

                if (httpContext.Request.Path.StartsWithSegments("/graphql"))
                {
                    return provider.GetRequiredService<HeaderBasedRepositoryResolver>();
                }
                else
                {
                    return provider.GetRequiredService<SessionBasedRepositoryResolver>();
                }
            });

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

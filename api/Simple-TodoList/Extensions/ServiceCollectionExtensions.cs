using GraphQL.Types;
using GraphQL.DI;
using Simple_TodoList.Repositories;
using GraphQL;
using GraphQL.SystemTextJson;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Simple_TodoList.GraphQL.Categories;
using Simple_TodoList.GraphQL.Todos;
using Simple_TodoList.GraphQL.Tasks;
using Simple_TodoList.GraphQL;
using Simple_TodoList.Dependency.Repositories.RepositoryResolvers;

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
            // types
            services.AddTransient<TaskType>();
            services.AddTransient<CategoryType>();

            // input types
            services.AddTransient<TaskInputType>();
            services.AddTransient<CategoryInputType>();

            // queries
            services.AddTransient<TaskQuery>();
            services.AddTransient<CategoryQuery>();
            services.AddTransient<RootQuery>();

            // mutata
            services.AddTransient<TaskMutation>();
            services.AddTransient<CategoryMutation>();
            services.AddTransient<RootMutation>();

            services.AddTransient<ISchema, RootSchema>();

            services.AddGraphQL(b => b
                .AddAutoSchema<ISchema>()
                .AddSystemTextJson()
                .AddErrorInfoProvider(opt => opt.ExposeExceptionDetails = true)
                );

            return services;
        }
    }
}

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
using Simple_TodoList.GraphQL.Schemas;

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

            services.AddTransient<TaskType>();
            services.AddTransient<CategoryType>();

            services.AddTransient<TaskQuery>();
            services.AddTransient<CategoryQuery>();
            services.AddTransient<RootQuery>();

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

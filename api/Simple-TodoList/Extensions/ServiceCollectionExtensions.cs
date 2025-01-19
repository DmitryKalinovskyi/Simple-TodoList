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
using Simple_TodoList.GraphQL.Tasks.Input;
using Simple_TodoList.GraphQL.Categories.Input;
using Simple_TodoList.GraphQL.Tasks.Services;
using Microsoft.AspNetCore.WebSockets;
using Simple_TodoList.Repositories.SQLRepositories;
using Simple_TodoList.Dependency.Repositories.RepositoryProxies;
using System.Reflection;
using Simple_TodoList.Services.Storage;
using Simple_TodoList.Dependency.Repositories.RepositoryResolvers;

namespace Simple_TodoList.Extensions
{
    public static class ServiceCollectionExtensions
    {
        /// <summary>
        /// Helps to register repository as singleton with lifetime of scoped.
        /// </summary>
        /// <typeparam name="TRepository"></typeparam>
        /// <param name="services"></param>
        /// <param name="resolve"></param>
        /// <returns></returns>
        /// <exception cref="InvalidCastException"></exception>
        public static IServiceCollection AddRepositoryProxy<TRepository>(this IServiceCollection services, Func<IRepositoryResolver, TRepository> resolve) where TRepository: class
        {
            services.AddSingleton(provider =>
            {
                var repositoryProxy = DispatchProxy.Create<TRepository, RepositoryProxy<TRepository>>();
                var asRepositoryProxy = repositoryProxy as RepositoryProxy<TRepository>
               ?? throw new InvalidCastException($"Failed to cast {nameof(repositoryProxy)} to {nameof(RepositoryProxy<TRepository>)}.");

                asRepositoryProxy.SetRepositoryFactory(() => resolve(provider.GetRequiredService<IRepositoryResolver>()));
                return repositoryProxy;
            });

            return services;
        }

        public static IServiceCollection AddRepositoryResolvers(this IServiceCollection services)
        {
            services.AddSingleton<HeaderStorageTypeSource>();
            services.AddSingleton<SessionStorageTypeSwitcher>();

            services.AddTransient<IStorageTypeSource>(provider =>
            {
                var httpContextAccessor = provider.GetRequiredService<IHttpContextAccessor>();
                var httpContext = httpContextAccessor.HttpContext ??
                throw new InvalidOperationException("HttpContextAccessor is null.");

                if (httpContext.Request.Path.StartsWithSegments("/graphql"))
                {
                    return provider.GetRequiredService<HeaderStorageTypeSource>();
                }
                else
                {
                    return provider.GetRequiredService<SessionStorageTypeSwitcher>();
                }
            });

            services.AddSingleton<IRepositoryResolver, RepositoryResolver>();

            services.AddRepositoryProxy((resolver) => resolver.GetCategoriesRepository());
            services.AddRepositoryProxy((resolver) => resolver.GetTasksRepository());

            return services;
        }

        public static IServiceCollection AddGraphQLServices(this IServiceCollection services)
        {
            services.AddSingleton<ITaskEventHandler, TaskEventHandler>();

            // types
            services.AddSingleton<TaskType>();
            services.AddSingleton<CategoryType>();

            // input types
            services.AddSingleton<CreateTaskInputType>();
            services.AddSingleton<CreateCategoryInputType>();
            services.AddSingleton<UpdateTaskInputType>();
            services.AddSingleton<UpdateCategoryInputType>();

            // queries
            services.AddSingleton<TaskQuery>();
            services.AddSingleton<CategoryQuery>();
            services.AddSingleton<RootQuery>();

            // mutata
            services.AddSingleton<TaskMutation>();
            services.AddSingleton<CategoryMutation>();
            services.AddSingleton<RootMutation>();

            // subscriptions
            services.AddSingleton<TaskSubscription>();
            services.AddSingleton<RootSubscription>();

            services.AddSingleton<ISchema, RootSchema>();

            services.AddGraphQL(b => b
                .AddAutoSchema<ISchema>()
                .AddSystemTextJson()
                .AddErrorInfoProvider(opt => opt.ExposeExceptionDetails = true)
                ).AddWebSockets(b =>
                {
                    b.KeepAliveInterval = TimeSpan.FromSeconds(5);
                });
            return services;
        }
    }
}

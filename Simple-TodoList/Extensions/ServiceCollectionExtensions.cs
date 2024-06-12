using Simple_TodoList.Factories;
using Simple_TodoList.Repositories;

namespace Simple_TodoList.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddRepositoryResolvers(this IServiceCollection services)
        {
            services.AddScoped<ITasksRepository>((provider) =>
            {
                var resolver = provider.GetRequiredService<IRepositoryResolver>();
                return resolver.GetTasksRepository();
            });

            services.AddScoped<ICategoriesRepository>((provider) =>
            {
                var resolver = provider.GetRequiredService<IRepositoryResolver>();
                return resolver.GetCategoriesRepository();
            });

            return services;
        }
    }
}

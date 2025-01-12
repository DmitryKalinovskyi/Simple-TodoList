using Simple_TodoList.Repositories;
using Simple_TodoList.Repositories.SQLRepositories;

namespace Simple_TodoList.Dependency.Repositories
{
    public class SQLRepositoryFactory(IServiceProvider serviceProvider) : IRepositoryFactory
    {
        private readonly IServiceProvider _serviceProvider = serviceProvider;

        public ICategoriesRepository GetCategoriesRepository()
        {
            return _serviceProvider.GetRequiredService<CategoriesRepository>();
        }

        public ITasksRepository GetTasksRepository()
        {
            return _serviceProvider.GetRequiredService<TasksRepository>();
        }
    }
}

using Simple_TodoList.Repositories;
using Simple_TodoList.Repositories.XMLRepositories;

namespace Simple_TodoList.Dependency.Repositories.RepositoryFactories
{
    public class XMLRepositoryFactory(IServiceProvider serviceProvider) : IRepositoryFactory
    {
        private readonly IServiceProvider _serviceProvider = serviceProvider;

        public ICategoriesRepository GetCategoriesRepository()
        {
            return _serviceProvider.GetRequiredService<XMLCategoriesRepository>();
        }

        public ITasksRepository GetTasksRepository()
        {
            return _serviceProvider.GetRequiredService<XMLTasksRepository>();
        }
    }
}

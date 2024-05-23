using Simple_TodoList.Repository;
using Simple_TodoList.Repository.XML;

namespace Simple_TodoList.Factories
{
    public class XMLRepositoryFactory(IServiceProvider serviceProvider) : IRepositoryFactory
    {
        private readonly IServiceProvider _serviceProvider = serviceProvider;

        public ICategoriesRepository GetCategoriesRepository()
        {
            return _serviceProvider.GetRequiredService<XMLCategoriesRepository>();
        }

        public ITasksResository GetTasksRepository()
        {
            return _serviceProvider.GetRequiredService<XMLTasksRepository>();
        }
    }
}

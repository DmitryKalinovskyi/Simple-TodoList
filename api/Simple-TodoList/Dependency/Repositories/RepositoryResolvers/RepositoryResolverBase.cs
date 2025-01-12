using Simple_TodoList.Dependency.Repositories;
using Simple_TodoList.Repositories;
using System.ComponentModel;

namespace Simple_TodoList.Dependency.Repositories.RepositoryResolvers
{
    public abstract class RepositoryResolverBase : IRepositoryResolver
    {
        protected Lazy<IRepositoryFactory> _factory;
        private IServiceProvider _serviceProvider;

        public abstract StorageType StorageType { get;}

        public RepositoryResolverBase(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            _factory = new Lazy<IRepositoryFactory>(ResolveRepositoryFactory);
        }

        public IRepositoryFactory ResolveRepositoryFactory()
        {
            IRepositoryFactory factory = StorageType switch
            {
                StorageType.SQLServer => _serviceProvider.GetRequiredService<SQLRepositoryFactory>(),
                StorageType.XML => _serviceProvider.GetRequiredService<XMLRepositoryFactory>(),
                _ => throw new InvalidEnumArgumentException(nameof(StorageType))
            };

            return factory;
        }

        public ICategoriesRepository GetCategoriesRepository()
        {
            return _factory.Value.GetCategoriesRepository();
        }

        public ITasksRepository GetTasksRepository()
        {
            return _factory.Value.GetTasksRepository();
        }
    }
}

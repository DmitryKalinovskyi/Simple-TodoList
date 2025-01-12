using Simple_TodoList.Dependency.Repositories;
using Simple_TodoList.Repositories;
using System.ComponentModel;

namespace Simple_TodoList.Dependency.Repositories.RepositoryResolvers
{
    public abstract class RepositoryResolverBase : IRepositoryResolver
    {
        protected Lazy<IRepositoryFactory> _factory;
        private IServiceProvider _serviceProvider;

        public RepositoryResolverBase(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            _factory = new Lazy<IRepositoryFactory>(ResolveRepositoryFactory);
        }

        public IRepositoryFactory ResolveRepositoryFactory()
        {
            StorageType storageType = GetStorageType();
            IRepositoryFactory factory;

            switch (storageType)
            {
                case StorageType.SQLServer: factory = _serviceProvider.GetRequiredService<SQLRepositoryFactory>(); break;
                case StorageType.XML: factory = _serviceProvider.GetRequiredService<XMLRepositoryFactory>(); break;
                default: throw new InvalidEnumArgumentException(nameof(storageType));
            }

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

        public abstract StorageType GetStorageType();
    }
}

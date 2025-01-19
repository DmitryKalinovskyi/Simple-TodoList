using Simple_TodoList.Dependency.Repositories.RepositoryFactories;
using Simple_TodoList.Repositories;
using Simple_TodoList.Services.Storage;
using System.ComponentModel;

namespace Simple_TodoList.Dependency.Repositories.RepositoryResolvers
{
    public class RepositoryResolver : IRepositoryResolver
    {
        protected Lazy<IRepositoryFactory> _factory;
        protected readonly IServiceProvider _serviceProvider;

        public RepositoryResolver(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            _factory = new Lazy<IRepositoryFactory>(ResolveRepositoryFactory);
        }

        public IRepositoryFactory ResolveRepositoryFactory()
        {
            var storageTypeSource = _serviceProvider.GetRequiredService<IStorageTypeSource>();

            IRepositoryFactory factory = storageTypeSource.StorageType switch
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

using Simple_TodoList.Repositories;
using Simple_TodoList.Repositories.SQLRepositories;
using Simple_TodoList.Repositories.XMLRepositories;
using System.ComponentModel;

namespace Simple_TodoList.Factories
{
    public enum StorageType
    {
        SQL,
        XML
    }

    public class RepositoryResolver(IServiceProvider serviceProvider): IRepositoryFactory
    {
        private readonly IServiceProvider _serviceProvider = serviceProvider;
        private StorageType _storageType = StorageType.SQL;
        private IRepositoryFactory _factory = serviceProvider.GetRequiredService<SQLRepositoryFactory>();

        public ICategoriesRepository GetCategoriesRepository()
        {
            return _factory.GetCategoriesRepository();
        }

        public ITasksResository GetTasksRepository()
        {
            return _factory.GetTasksRepository();
        }

        public RepositoryResolver SetStorageType(StorageType storageType)
        {
            _storageType = storageType;
            switch(storageType)
            {
                case StorageType.SQL: _factory = _serviceProvider.GetRequiredService<SQLRepositoryFactory>(); break;
                case StorageType.XML: _factory = _serviceProvider.GetRequiredService<XMLRepositoryFactory>(); break;
                default:  throw new InvalidEnumArgumentException(nameof(storageType));
            }

            return this;
        }

        public StorageType GetStorageType()
        {
            return _storageType;
        }
    }
}

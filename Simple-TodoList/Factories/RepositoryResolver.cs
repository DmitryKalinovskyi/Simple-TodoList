using Simple_TodoList.Repository;
using Simple_TodoList.Repository.SQL;
using Simple_TodoList.Repository.XML;
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

        private IRepositoryFactory _factory = serviceProvider.GetRequiredService<XMLRepositoryFactory>();

        public ICategoriesRepository GetCategoriesRepository()
        {
            return _factory.GetCategoriesRepository();
        }

        public ITasksResository GetTasksRepository()
        {
            return _factory.GetTasksRepository();
        }

        public RepositoryResolver SetFactory(IRepositoryFactory repositoryFactory)
        {
            _factory = repositoryFactory;
            return this;
        }

        public RepositoryResolver SetFactoryByStorageType(StorageType storageType)
        {
            switch(storageType)
            {
                case StorageType.SQL: _factory = _serviceProvider.GetRequiredService<SQLRepositoryFactory>(); break;
                case StorageType.XML: _factory = _serviceProvider.GetRequiredService<SQLRepositoryFactory>(); break;
                default:  throw new InvalidEnumArgumentException(nameof(storageType));
            }

            return this;
        }
    }
}

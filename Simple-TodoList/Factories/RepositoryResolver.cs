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

    public class RepositoryResolver(IServiceProvider serviceProvider)
    {
        private readonly IServiceProvider _serviceProvider = serviceProvider;

        public ICategoriesRepository ResolveCategoriesRepository(StorageType storageType)
        {
            return storageType switch
            {
                StorageType.SQL => _serviceProvider.GetRequiredService<CategoriesRepository>(),
                StorageType.XML => _serviceProvider.GetRequiredService<XMLCategoriesRepository>(),
                _ => throw new InvalidEnumArgumentException(nameof(storageType))
            };
        }

        public ITaskResository ResolveTaskResository(StorageType storageType)
        {
            return storageType switch
            {
                StorageType.SQL => _serviceProvider.GetRequiredService<TaskRepository>(),
                StorageType.XML => _serviceProvider.GetRequiredService<XMLTaskRepository>(),
                _ => throw new InvalidEnumArgumentException(nameof(storageType))
            };
        }
    }
}

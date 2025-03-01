using Simple_TodoList.Dependency.Repositories.RepositoryFactories;
using Simple_TodoList.Repositories;
using Simple_TodoList.Services.Storage;
using System.ComponentModel;

namespace Simple_TodoList.Dependency.Repositories.RepositoryResolvers
{
    public class RepositoryResolver(IServiceProvider serviceProvider) : IRepositoryResolver
    {
        public IRepositoryFactory ResolveRepositoryFactory()
        {
            var storageTypeSource = serviceProvider.GetRequiredService<IStorageTypeSource>();

            IRepositoryFactory factory = storageTypeSource.StorageType switch
            {
                StorageType.SQLServer => serviceProvider.GetRequiredService<SQLRepositoryFactory>(),
                StorageType.XML => serviceProvider.GetRequiredService<XMLRepositoryFactory>(),
                _ => throw new InvalidEnumArgumentException(nameof(StorageType))
            };

            return factory;
        }

        public ICategoriesRepository GetCategoriesRepository()
        {
            return ResolveRepositoryFactory().GetCategoriesRepository();
        }

        public ITasksRepository GetTasksRepository()
        {
            return ResolveRepositoryFactory().GetTasksRepository();
        }
    }
}

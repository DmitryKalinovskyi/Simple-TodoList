using Simple_TodoList.Dependency.Repositories;

namespace Simple_TodoList.Dependency.Repositories.RepositoryResolvers
{
    public interface IModifiableRepositoryResolver : IRepositoryResolver
    {
        public IRepositoryFactory SetStorageType(StorageType storageType);
    }
}

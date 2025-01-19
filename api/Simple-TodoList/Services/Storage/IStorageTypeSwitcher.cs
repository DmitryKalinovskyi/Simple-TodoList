using Simple_TodoList.Dependency.Repositories.RepositoryResolvers;

namespace Simple_TodoList.Services.Storage
{
    public interface IStorageTypeSwitcher
    {
        void SwitchStorageType(StorageType storageType);
    }
}

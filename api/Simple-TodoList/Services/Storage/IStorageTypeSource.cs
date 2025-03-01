using Simple_TodoList.Dependency.Repositories.RepositoryResolvers;

namespace Simple_TodoList.Services.Storage
{
    public interface IStorageTypeSource
    {
        StorageType StorageType { get; }
    }
}

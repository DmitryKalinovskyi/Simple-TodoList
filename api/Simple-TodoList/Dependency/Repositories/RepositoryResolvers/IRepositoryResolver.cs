using Simple_TodoList.Dependency.Repositories;

namespace Simple_TodoList.Dependency.Repositories.RepositoryResolvers
{
    public enum StorageType
    {
        SQLServer,
        XML
    }

    public interface IRepositoryResolver : IRepositoryFactory
    {
        public StorageType StorageType { get;}
        public IRepositoryFactory ResolveRepositoryFactory();
    }
}

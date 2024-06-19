namespace Simple_TodoList.Factories.RepositoryResolvers
{
    public enum StorageType
    {
        SQLServer,
        XML
    }

    public interface IRepositoryResolver : IRepositoryFactory
    {
        public IRepositoryFactory ResolveRepositoryFactory();

        public StorageType GetStorageType();
    }
}

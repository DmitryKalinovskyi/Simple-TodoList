namespace Simple_TodoList.Factories
{
    public enum StorageType
    {
        SQLServer,
        XML
    }

    public interface IRepositoryResolver : IRepositoryFactory
    {
        public IRepositoryFactory SetStorageType(StorageType storageType);

        public StorageType GetStorageType();
    }
}

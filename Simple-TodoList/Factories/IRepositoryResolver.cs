namespace Simple_TodoList.Factories
{
    public enum StorageType
    {
        SQL,
        XML
    }

    public interface IRepositoryResolver : IRepositoryFactory
    {
        public IRepositoryFactory SetStorageType(StorageType storageType);

        public StorageType GetStorageType();
    }
}

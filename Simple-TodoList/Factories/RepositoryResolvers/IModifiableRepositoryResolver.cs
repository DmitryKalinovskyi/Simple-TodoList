namespace Simple_TodoList.Factories.RepositoryResolvers
{
    public interface IModifiableRepositoryResolver: IRepositoryResolver
    {
        public IRepositoryFactory SetStorageType(StorageType storageType);
    }
}

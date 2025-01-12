namespace Simple_TodoList.Dependency.Repositories.RepositoryResolvers
{
    public class SessionBasedRepositoryResolver : RepositoryResolverBase, IModifiableRepositoryResolver
    {
        public static StorageType DefaultStorageType = StorageType.SQLServer;

        private const string SESSION_STORAGE_TYPE_KEY = "SESSION_STORAGE_TYPE";

        private readonly IHttpContextAccessor _httpContextAccessor;

        public override StorageType StorageType => GetStorageTypeFromHttpContext();

        public SessionBasedRepositoryResolver(IHttpContextAccessor httpContextAccessor,
            IServiceProvider serviceProvider) : base(serviceProvider)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public IRepositoryFactory SetStorageType(StorageType storageType)
        {
            _httpContextAccessor.HttpContext?.Session.SetString(SESSION_STORAGE_TYPE_KEY, storageType.ToString());
            _factory = new Lazy<IRepositoryFactory>(ResolveRepositoryFactory);

            return this;
        }

        private StorageType GetStorageTypeFromHttpContext()
        {
            string? value = _httpContextAccessor.HttpContext?.Session.GetString(SESSION_STORAGE_TYPE_KEY);

            if (!string.IsNullOrEmpty(value) && Enum.TryParse(typeof(StorageType), value, out var result))
            {
                return (StorageType)result;
            }

            return DefaultStorageType;
        }
    }
}

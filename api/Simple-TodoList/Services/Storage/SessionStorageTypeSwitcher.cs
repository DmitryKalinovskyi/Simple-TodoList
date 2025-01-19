using Simple_TodoList.Dependency.Repositories.RepositoryFactories;

namespace Simple_TodoList.Services.Storage
{
    public class SessionStorageTypeSwitcher(IServiceProvider serviceProvider) : IStorageTypeSwitcher, IStorageTypeSource
    {
        public static readonly StorageType DefaultStorageType = StorageType.SQLServer;
        public StorageType StorageType => GetStorageTypeFromSession();

        private const string SESSION_STORAGE_TYPE_KEY = "SESSION_STORAGE_TYPE";

        private IHttpContextAccessor HttpContextAccessor => serviceProvider.GetRequiredService<IHttpContextAccessor>();

        public void SwitchStorageType(StorageType storageType)
        {
            HttpContextAccessor.HttpContext?.Session.SetString(SESSION_STORAGE_TYPE_KEY, storageType.ToString());
        }

        private StorageType GetStorageTypeFromSession()
        {
            string? value = HttpContextAccessor.HttpContext?.Session.GetString(SESSION_STORAGE_TYPE_KEY);

            if (!string.IsNullOrEmpty(value) && Enum.TryParse(typeof(StorageType), value, out var result))
            {
                return (StorageType)result;
            }

            return DefaultStorageType;
        }
    }
}

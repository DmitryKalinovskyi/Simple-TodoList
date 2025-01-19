using Simple_TodoList.Repositories;
using System.ComponentModel;

namespace Simple_TodoList.Services.Storage
{
    public class HeaderStorageTypeSource(IServiceProvider serviceProvider) : IStorageTypeSource
    {
        public static StorageType DefaultStorageType { get; set; }
        public StorageType StorageType => GetStorageTypeFromHeader();

        private const string HEADER_NAME = "Storage-Type";

        private StorageType GetStorageTypeFromHeader()
        {
            var httpContextAccessor = serviceProvider.GetRequiredService<IHttpContextAccessor>();
            var headers = httpContextAccessor.HttpContext?.Request.Headers;

            if (headers is not null &&
                headers.TryGetValue(HEADER_NAME, out var storageTypeHeader) &&
                Enum.TryParse(storageTypeHeader, true, out StorageType storageType)
                )
            {
                return storageType;
            }

            return DefaultStorageType;
        }
    }
}

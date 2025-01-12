using Simple_TodoList.Repositories;
using System.ComponentModel;

namespace Simple_TodoList.Dependency.Repositories.RepositoryResolvers
{
    public class HeaderBasedRepositoryResolver : RepositoryResolverBase
    {
        public static StorageType DefaultStorageType { get; set; }
        public override StorageType StorageType => GetStorageTypeFromHeader();

        private const string HEADER_NAME = "Storage-Type";

        private readonly IHttpContextAccessor _httpContextAccessor;

        public HeaderBasedRepositoryResolver(IServiceProvider serviceProvider, IHttpContextAccessor httpContextAccessor)
            : base(serviceProvider)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        private StorageType GetStorageTypeFromHeader()
        {
            var headers = _httpContextAccessor.HttpContext?.Request.Headers;

            if (headers is not null && headers.TryGetValue(HEADER_NAME, out var storageTypeHeader))
            {
                if (Enum.TryParse(storageTypeHeader, true, out StorageType storageType))
                {
                    return storageType;
                }
            }

            return DefaultStorageType;
        }
    }
}

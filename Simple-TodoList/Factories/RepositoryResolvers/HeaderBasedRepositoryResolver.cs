using Simple_TodoList.Repositories;
using System.ComponentModel;

namespace Simple_TodoList.Factories.RepositoryResolvers
{
    public class HeaderBasedRepositoryResolver : RepositoryResolverBase
    {
        private const string HEADER_NAME = "Storage-Type";

        private readonly IHttpContextAccessor _httpContextAccessor;

        public HeaderBasedRepositoryResolver(IServiceProvider serviceProvider, IHttpContextAccessor httpContextAccessor)
            : base(serviceProvider)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public override StorageType GetStorageType()
        {
            var headers = _httpContextAccessor.HttpContext.Request.Headers;

            if (headers.TryGetValue(HEADER_NAME, out var storageTypeHeader))
            {
                if (Enum.TryParse(storageTypeHeader, true, out StorageType storageType))
                {
                    return storageType;
                }
            }

            // Default storage type
            return StorageType.SQLServer;
        }
    }
}

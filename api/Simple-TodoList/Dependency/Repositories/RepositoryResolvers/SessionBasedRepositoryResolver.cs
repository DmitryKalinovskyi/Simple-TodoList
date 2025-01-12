using Microsoft.Extensions.DependencyInjection;
using Simple_TodoList.Dependency.Repositories;
using Simple_TodoList.Repositories;
using Simple_TodoList.Repositories.SQLRepositories;
using Simple_TodoList.Repositories.XMLRepositories;
using System;
using System.ComponentModel;

namespace Simple_TodoList.Dependency.Repositories.RepositoryResolvers
{
    public class SessionBasedRepositoryResolver : RepositoryResolverBase, IModifiableRepositoryResolver
    {
        private const string SESSION_KEY = "_StorageType";

        private readonly IHttpContextAccessor _httpContextAccessor;

        public SessionBasedRepositoryResolver(IHttpContextAccessor httpContextAccessor,
            IServiceProvider serviceProvider) : base(serviceProvider)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public IRepositoryFactory SetStorageType(StorageType storageType)
        {
            _httpContextAccessor.HttpContext?.Session.SetString(SESSION_KEY, storageType.ToString());
            _factory = new Lazy<IRepositoryFactory>(ResolveRepositoryFactory);

            return this;
        }

        public override StorageType GetStorageType()
        {
            try
            {
                string? value = _httpContextAccessor.HttpContext.Session.GetString(SESSION_KEY);

                if (!string.IsNullOrEmpty(value) && Enum.TryParse(typeof(StorageType), value, out var result))
                {
                    return (StorageType)result;
                }
            }
            catch { };

            // use sqlServer as default storage type
            return StorageType.SQLServer;
        }
    }
}

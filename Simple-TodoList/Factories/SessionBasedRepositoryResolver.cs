using Microsoft.Extensions.DependencyInjection;
using Simple_TodoList.Repositories;
using Simple_TodoList.Repositories.SQLRepositories;
using Simple_TodoList.Repositories.XMLRepositories;
using System;
using System.ComponentModel;

namespace Simple_TodoList.Factories
{
    public class SessionBasedRepositoryResolver: IRepositoryResolver
    {
        private const string SESSION_KEY = "_StorageType";

        private Lazy<IRepositoryFactory> _factory;
        private IServiceProvider _serviceProvider;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public SessionBasedRepositoryResolver(IHttpContextAccessor httpContextAccessor, IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            _httpContextAccessor = httpContextAccessor;
            _factory = new Lazy<IRepositoryFactory>(ResolveFactory);
        }

        private IRepositoryFactory ResolveFactory()
        {
            StorageType storageType = GetStorageType();
            IRepositoryFactory factory;

            switch (storageType)
            {
                case StorageType.SQLServer: factory = _serviceProvider.GetRequiredService<SQLRepositoryFactory>(); break;
                case StorageType.XML: factory = _serviceProvider.GetRequiredService<XMLRepositoryFactory>(); break;
                default: throw new InvalidEnumArgumentException(nameof(storageType));
            }

            return factory;
        }

        public ICategoriesRepository GetCategoriesRepository()
        {
            return _factory.Value.GetCategoriesRepository();
        }

        public ITasksRepository GetTasksRepository()
        {
            return _factory.Value.GetTasksRepository();
        }

        public IRepositoryFactory SetStorageType(StorageType storageType)
        {
            _httpContextAccessor.HttpContext?.Session.SetString(SESSION_KEY, storageType.ToString());
            _factory = new Lazy<IRepositoryFactory>(ResolveFactory);

            return this;
        }

        public StorageType GetStorageType()
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

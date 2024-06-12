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

        private IServiceProvider _serviceProvider;
        private IRepositoryFactory _repositoryFactory;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public SessionBasedRepositoryResolver(IHttpContextAccessor httpContextAccessor, IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
            _httpContextAccessor = httpContextAccessor;
            _repositoryFactory = ResolveFactory();
        }

        private IRepositoryFactory ResolveFactory()
        {

            StorageType storageType = GetStorageType();
            IRepositoryFactory factory;

            switch (storageType)
            {
                case StorageType.SQL: factory = _serviceProvider.GetRequiredService<SQLRepositoryFactory>(); break;
                case StorageType.XML: factory = _serviceProvider.GetRequiredService<XMLRepositoryFactory>(); break;
                default: throw new InvalidEnumArgumentException(nameof(storageType));
            }

            return factory;
        }

        public ICategoriesRepository GetCategoriesRepository()
        {
            return _repositoryFactory.GetCategoriesRepository();
        }

        public ITasksRepository GetTasksRepository()
        {
            return _repositoryFactory.GetTasksRepository();
        }

        public IRepositoryFactory SetStorageType(StorageType storageType)
        {
            // write into session new storage type
            _httpContextAccessor.HttpContext.Session.SetString(SESSION_KEY, storageType.ToString());

            return this;
        }

        public StorageType GetStorageType()
        {
            // look at the session
            string value = _httpContextAccessor.HttpContext.Session.GetString(SESSION_KEY) ?? StorageType.SQL.ToString();

            StorageType storageType = (StorageType)Enum.Parse(typeof(StorageType), value);

            return storageType;
        }
    }
}

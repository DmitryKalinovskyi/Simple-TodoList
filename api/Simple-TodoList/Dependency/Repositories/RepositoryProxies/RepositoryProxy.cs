using Simple_TodoList.Dependency.Repositories.RepositoryResolvers;
using Simple_TodoList.Models;
using Simple_TodoList.Repositories;
using System.Reflection;

namespace Simple_TodoList.Dependency.Repositories.RepositoryProxies
{
    public class RepositoryProxy<TRepository> : DispatchProxy
    {
        private Func<TRepository>? _repositoryFactory;

        public void SetRepositoryFactory(Func<TRepository> repositoryFactory)
        {
            _repositoryFactory = repositoryFactory;
        }
        protected override object? Invoke(MethodInfo? targetMethod, object?[]? args)
        {
            if(_repositoryFactory is null)
            {
                throw new InvalidOperationException("Cannot invoke RepositoryProxy method, because repository factory is not provided.");
            }

            // Invoke the target method on the resolved repository
            return targetMethod?.Invoke(_repositoryFactory(), args);
        }
    }
}

using Simple_TodoList.Dependency.Repositories.RepositoryFactories;

namespace Simple_TodoList.Dependency.Repositories.RepositoryResolvers
{
    public interface IRepositoryResolver : IRepositoryFactory
    {
        public IRepositoryFactory ResolveRepositoryFactory();
    }
}

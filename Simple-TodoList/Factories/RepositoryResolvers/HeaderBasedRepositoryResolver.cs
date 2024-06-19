using Simple_TodoList.Repositories;
using System.ComponentModel;

namespace Simple_TodoList.Factories.RepositoryResolvers
{
    public class HeaderBasedRepositoryResolver : RepositoryResolverBase
    {
        public HeaderBasedRepositoryResolver(IServiceProvider serviceProvider) : base(serviceProvider) { }

        public override StorageType GetStorageType()
        {
            return StorageType.SQLServer;
        }
    }
}

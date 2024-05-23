using Simple_TodoList.Repositories;

namespace Simple_TodoList.Factories
{
    public interface IRepositoryFactory
    {
        public ICategoriesRepository GetCategoriesRepository();
        
        public ITasksResository GetTasksRepository();
    }
}

using Simple_TodoList.Repository;

namespace Simple_TodoList.Factories
{
    public interface IRepositoryFactory
    {
        public ICategoriesRepository GetCategoriesRepository();
        
        public ITasksResository GetTasksRepository();
    }
}

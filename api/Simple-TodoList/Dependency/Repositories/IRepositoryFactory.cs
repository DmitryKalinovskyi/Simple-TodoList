using Simple_TodoList.Repositories;

namespace Simple_TodoList.Dependency.Repositories
{
    public interface IRepositoryFactory
    {
        public ICategoriesRepository GetCategoriesRepository();

        public ITasksRepository GetTasksRepository();
    }
}

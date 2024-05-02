using Simple_TodoList.Models;

namespace Simple_TodoList.Repository
{
    public interface ITaskResository
    {
        public void Insert(TaskModel task);

        public Task<TaskModel> GetById(int id);
        public Task<IEnumerable<TaskModel>> GetAll();

        public void Update(TaskModel task);

        public void Delete(int id);
    }
}

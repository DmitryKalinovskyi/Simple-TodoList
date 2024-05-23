using Simple_TodoList.Models;

namespace Simple_TodoList.Repositories
{
    public interface ITasksResository
    {
        #region CRUD
        public Task Insert(TaskModel task);

        public Task<TaskModel> GetById(int id);

        public Task Update(TaskModel task);

        public Task Delete(int id);

        #endregion

        public Task<IEnumerable<TaskModel>> GetAllWithStandartOrdering();

        public Task<IEnumerable<TaskModel>> GetAll();

        public Task UpdateComplition(int id, bool isComplete);
    }
}

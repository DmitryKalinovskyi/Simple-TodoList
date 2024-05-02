using Simple_TodoList.Models;

namespace Simple_TodoList.Repository
{
    public interface ITaskResository
    {
        #region CRUD
        public Task Insert(TaskModel task);

        public Task<TaskModel> GetById(int id);

        public Task Update(TaskModel task);

        public Task Delete(int id);

        #endregion

        public Task<IEnumerable<TaskModel>> GetAll();

        public Task UpdateName(int id, string name);

        public Task UpdateComplition(int id, bool isComplete);

        public Task UpdateDeadline(int id, DateTime deadline);

        public Task UpdateCategoryId(int id, int? categoryId);
    }
}

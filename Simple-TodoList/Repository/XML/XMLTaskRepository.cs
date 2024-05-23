using Simple_TodoList.Models;

namespace Simple_TodoList.Repository.XML
{
    public class XMLTaskRepository : ITaskResository
    {
        public Task Delete(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<TaskModel>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<TaskModel>> GetAllWithStandartOrdering()
        {
            throw new NotImplementedException();
        }

        public Task<TaskModel> GetById(int id)
        {
            throw new NotImplementedException();
        }

        public Task Insert(TaskModel task)
        {
            throw new NotImplementedException();
        }

        public Task Update(TaskModel task)
        {
            throw new NotImplementedException();
        }

        public Task UpdateComplition(int id, bool isComplete)
        {
            throw new NotImplementedException();
        }
    }
}

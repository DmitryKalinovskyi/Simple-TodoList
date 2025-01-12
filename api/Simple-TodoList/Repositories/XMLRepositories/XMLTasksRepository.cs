using Simple_TodoList.Extensions;
using Simple_TodoList.Models;
using Simple_TodoList.Services.XMLStorage;

namespace Simple_TodoList.Repositories.XMLRepositories
{
    public class XMLTasksRepository(IXMLStorage xmlStorage) : ITasksRepository
    {
        private const string COLLECTION = "Tasks";

        public async Task Delete(int id)
        {
            await xmlStorage.DeleteRecord(COLLECTION, id.ToString());
        }

        public async Task<IEnumerable<TaskModel>> GetAll()
        {
            return await xmlStorage.GetRecords<TaskModel>(COLLECTION);
        }

        public Task<IEnumerable<TaskModel>> GetAllWithStandartOrdering()
        {
            return GetAll();
        }

        public async Task<TaskModel?> GetById(int id)
        {
            return await xmlStorage.FindRecord<TaskModel>(COLLECTION, id.ToString());
        }

        public async Task<TaskModel> Insert(TaskModel task)
        {
           return await xmlStorage.AddRecord(COLLECTION, task);
        }

        public async Task Update(int id, TaskModel task)
        {
            await xmlStorage.UpdateRecord(COLLECTION, id.ToString(), task);
        }

        public async Task UpdateComplition(int id, bool isCompleted)
        {
            var task = await xmlStorage.FindRecord<TaskModel>(COLLECTION, id.ToString());
            task.IsCompleted = isCompleted;
            await xmlStorage.UpdateRecord(COLLECTION, id.ToString(), task);
        }
    }
}

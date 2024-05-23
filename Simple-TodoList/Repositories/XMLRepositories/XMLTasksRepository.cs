using Simple_TodoList.Extensions;
using Simple_TodoList.Models;
using Simple_TodoList.Services.XMLStorage;

namespace Simple_TodoList.Repositories.XMLRepositories
{
    public class XMLTasksRepository(IXMLStorage xmlStorage) : ITasksResository
    {
        private const string COLLECTION = "Tasks";

        private readonly IXMLStorage _xmlStorage = xmlStorage;

        public async Task Delete(int id)
        {
            await _xmlStorage.DeleteRecord(COLLECTION, id.ToString());
        }

        public async Task<IEnumerable<TaskModel>> GetAll()
        {
            return await _xmlStorage.GetRecords<TaskModel>(COLLECTION);
        }

        public Task<IEnumerable<TaskModel>> GetAllWithStandartOrdering()
        {
            return GetAll();
        }

        public async Task<TaskModel> GetById(int id)
        {
            return await _xmlStorage.FindRecord<TaskModel>(COLLECTION, id.ToString());
        }

        public async Task Insert(TaskModel task)
        {
            await _xmlStorage.AddRecord(COLLECTION, task);
        }

        public async Task Update(TaskModel task)
        {
            await _xmlStorage.UpdateRecord(COLLECTION, task.Id.ToString(), task);
        }

        public async Task UpdateComplition(int id, bool isCompleted)
        {
            var task = await _xmlStorage.FindRecord<TaskModel>(COLLECTION, id.ToString());
            task.IsCompleted = isCompleted;
            await _xmlStorage.UpdateRecord(COLLECTION, id.ToString(), task);
        }
    }
}

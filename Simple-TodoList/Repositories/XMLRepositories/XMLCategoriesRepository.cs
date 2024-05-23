using Simple_TodoList.Models;
using Simple_TodoList.Services.XMLStorage;

namespace Simple_TodoList.Repositories.XMLRepositories
{
    public class XMLCategoriesRepository(IXMLStorage xmlStorage) : ICategoriesRepository
    {
        private const string COLLECTION = "Categories";

        private readonly IXMLStorage _xmlStorage = xmlStorage;

        public async Task Delete(int id)
        {
            await _xmlStorage.DeleteRecord(COLLECTION, id.ToString());
        }

        public async Task<IEnumerable<CategoryModel>> GetAll()
        {
            return await _xmlStorage.GetRecords<CategoryModel>(COLLECTION);
        }

        public async Task<CategoryModel> GetById(int id)
        {
            return await _xmlStorage.FindRecord<CategoryModel>(COLLECTION, id.ToString());
        }

        public async Task Insert(CategoryModel category)
        {
            await _xmlStorage.AddRecord(COLLECTION, category);
        }
    }
}

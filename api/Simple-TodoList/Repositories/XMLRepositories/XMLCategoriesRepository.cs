using Simple_TodoList.Models;
using Simple_TodoList.Services.XMLStorage;

namespace Simple_TodoList.Repositories.XMLRepositories
{
    public class XMLCategoriesRepository(IXMLStorage xmlStorage) : ICategoriesRepository
    {
        private const string COLLECTION = "Categories";

        public async Task Delete(int id)
        {
            await xmlStorage.DeleteRecord(COLLECTION, id.ToString());
        }

        public async Task<IEnumerable<CategoryModel>> GetAll()
        {
            return await xmlStorage.GetRecords<CategoryModel>(COLLECTION);
        }

        public async Task<CategoryModel?> GetById(int id)
        {
            return await xmlStorage.FindRecord<CategoryModel>(COLLECTION, id.ToString());
        }

        public async Task Update(int id, CategoryModel category)
        {
            await xmlStorage.UpdateRecord(COLLECTION, id.ToString(), category);
        }

        public async Task<CategoryModel> Insert(CategoryModel category)
        {
            return await xmlStorage.AddRecord(COLLECTION, category);
        }
    }
}

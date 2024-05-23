using Simple_TodoList.Models;

namespace Simple_TodoList.Repository.XML
{
    public class XMLCategoriesRepository : ICategoriesRepository
    {
        public Task<IEnumerable<CategoryModel>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<CategoryModel> GetById(int id)
        {
            throw new NotImplementedException();
        }
    }
}

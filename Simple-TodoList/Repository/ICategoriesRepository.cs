using Simple_TodoList.Models;

namespace Simple_TodoList.Repository
{
    public interface ICategoriesRepository
    {
        public Task<CategoryModel> GetById(int id);

        public Task<IEnumerable<CategoryModel>> GetAll();
    }
}

using Simple_TodoList.Models;

namespace Simple_TodoList.Repositories
{
    public interface ICategoriesRepository
    {
        public Task<CategoryModel> Insert(CategoryModel category);

        public Task<CategoryModel?> GetById(int id);

        public Task<IEnumerable<CategoryModel>> GetAll();

        public Task Update(int id, CategoryModel category);

        public Task Delete(int id); 
    }
}

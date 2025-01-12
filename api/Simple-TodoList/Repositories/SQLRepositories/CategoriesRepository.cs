using Dapper;
using Microsoft.Data.SqlClient;
using Simple_TodoList.Extensions;
using Simple_TodoList.Models;
using System.Threading.Tasks;

namespace Simple_TodoList.Repositories.SQLRepositories
{
    public class CategoriesRepository : ICategoriesRepository
    {
        private string _connectionString;

        public CategoriesRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetSQLServerConnectionString();
        }

        public async Task Delete(int id)
        {
            using var connection = new SqlConnection(_connectionString);
            await connection.ExecuteAsync("delete from Categories where Id = @id", new { id });
        }

        public async Task<IEnumerable<CategoryModel>> GetAll()
        {
            using var connection = new SqlConnection(_connectionString);

            return await connection.QueryAsync<CategoryModel>("select * from Categories");
        }

        public async Task<CategoryModel?> GetById(int id)
        {
            using var connection = new SqlConnection(_connectionString);

            return await connection.QueryFirstAsync<CategoryModel>("select * from Categories where Id = @id", new { id });
        }

        public async Task<CategoryModel> Insert(CategoryModel category)
        {
            using var connection = new SqlConnection(_connectionString);

            var sqlInsert = @"insert into Categories (Name)
                      values (@Name);
                      SELECT CAST(SCOPE_IDENTITY() as int);";

            var categoryToInsert = new { category.Name };

            var newCategoryId = await connection.QuerySingleAsync<int>(sqlInsert, categoryToInsert);

            return await GetById(newCategoryId) ?? throw new InvalidOperationException("Inserted model is not founded.");
        }

        public Task Update(int id, CategoryModel category)
        {
            throw new NotImplementedException();
        }
    }
}

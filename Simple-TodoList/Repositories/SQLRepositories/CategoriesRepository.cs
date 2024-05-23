using Dapper;
using Microsoft.Data.SqlClient;
using Simple_TodoList.Extensions;
using Simple_TodoList.Models;

namespace Simple_TodoList.Repositories.SQLRepositories
{
    public class CategoriesRepository : ICategoriesRepository
    {
        private string _connectionString;

        public CategoriesRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetSQLServerConnectionString();
        }

        public Task Delete(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<CategoryModel>> GetAll()
        {
            using var connection = new SqlConnection(_connectionString);

            return await connection.QueryAsync<CategoryModel>("select * from Categories");
        }

        public async Task<CategoryModel> GetById(int id)
        {
            using var connection = new SqlConnection(_connectionString);

            return await connection.QueryFirstAsync<CategoryModel>("select * from Categories where Id = @id", new { id });
        }

        public Task Insert(CategoryModel category)
        {
            throw new NotImplementedException();
        }
    }
}

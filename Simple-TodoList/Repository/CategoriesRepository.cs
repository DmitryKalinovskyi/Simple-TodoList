using Dapper;
using Microsoft.Data.SqlClient;
using Simple_TodoList.Models;

namespace Simple_TodoList.Repository
{
    public class CategoriesRepository : ICategoriesRepository
    {
        private string _connectionString;

        public CategoriesRepository(string connectionString)
        {
            _connectionString = connectionString;
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
    }
}

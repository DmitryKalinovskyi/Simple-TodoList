using Dapper;
using Microsoft.Data.SqlClient;
using Simple_TodoList.Models;

namespace Simple_TodoList.Repository
{
    public class TaskRepository : ITaskResository
    {
        private string _connectionString;

        public TaskRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public async void Delete(int id)
        {
            using var connection = new SqlConnection(_connectionString);
            await connection.ExecuteAsync("delete * from Tasks where Id = @id", new { id });
        }

        public async Task<IEnumerable<TaskModel>> GetAll()
        {
            using var connection = new SqlConnection(_connectionString);

            return await connection.QueryAsync<TaskModel>("select * from Tasks");
        }

        public async Task<TaskModel> GetById(int id)
        {
            using var connection = new SqlConnection(_connectionString);

            return await connection.QueryFirstAsync<TaskModel>("select * from Tasks where Id = @id", new {id});
        }

        public async void Insert(TaskModel task)
        {
            using var connection = new SqlConnection(_connectionString);

            object taskToInsert = new { task.Name, task.IsCompleted, task.Deadline, task.CategoryId};

            var sql = "insert into Tasks (Name, IsCompleted, Deadline, CategoryId)" +
                " values (@Name, @IsCompleted, @Deadline, @CategoryId)";

            await connection.ExecuteAsync(sql, taskToInsert);
        }

        public async void Update(TaskModel task)
        {
            using var connection = new SqlConnection(_connectionString);

            var sql = "update Tasks set Name=@Name, IsCompleted=@IsCompleted, Deadline=@Deadline, CategoryId=@CategoryId" +
                "where Id=@Id";

            await connection.ExecuteAsync(sql, task);
        }
    }
}

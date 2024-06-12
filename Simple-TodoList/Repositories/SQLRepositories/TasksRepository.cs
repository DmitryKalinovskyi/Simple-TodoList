using Dapper;
using Microsoft.Data.SqlClient;
using Simple_TodoList.Extensions;
using Simple_TodoList.Models;
using System.Threading.Tasks;

namespace Simple_TodoList.Repositories.SQLRepositories
{
    public class TasksRepository : ITasksRepository
    {
        private string _connectionString;

        public TasksRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetSQLServerConnectionString();
        }

        public async Task Delete(int id)
        {
            using var connection = new SqlConnection(_connectionString);
            await connection.ExecuteAsync("delete from Tasks where Id = @id", new { id });
        }

        public async Task<IEnumerable<TaskModel>> GetAll()
        {
            using var connection = new SqlConnection(_connectionString);

            return await connection.QueryAsync<TaskModel>("select * from Tasks");
        }

        public async Task<IEnumerable<TaskModel>> GetAllWithStandartOrdering()
        {
            using var connection = new SqlConnection(_connectionString);

            var sql = @"select * from Tasks order by IsCompleted, 
                case 
                    when Deadline is NULL then 1
                    else 0
                end,
                Deadline
                ";

            return await connection.QueryAsync<TaskModel>(sql);
        }

        public async Task<TaskModel> GetById(int id)
        {
            using var connection = new SqlConnection(_connectionString);

            return await connection.QueryFirstAsync<TaskModel>("select * from Tasks where Id = @id", new { id });
        }

        public async Task Insert(TaskModel task)
        {
            using var connection = new SqlConnection(_connectionString);

            object taskToInsert = new { task.Name, task.IsCompleted, task.Deadline, task.CategoryId };

            var sql = "insert into Tasks (Name, IsCompleted, Deadline, CategoryId)" +
                " values (@Name, @IsCompleted, @Deadline, @CategoryId)";

            await connection.ExecuteAsync(sql, taskToInsert);
        }

        public async Task Update(TaskModel task)
        {
            using var connection = new SqlConnection(_connectionString);

            var sql = "update Tasks set Name=@Name, IsCompleted=@IsCompleted, Deadline=@Deadline, CategoryId=@CategoryId" +
                " where Id=@Id";

            await connection.ExecuteAsync(sql, task);
        }

        public async Task UpdateComplition(int id, bool isCompleted)
        {
            using var connection = new SqlConnection(_connectionString);

            var sql = "update Tasks set IsCompleted=@isCompleted" +
            " where Id=@id";

            await connection.ExecuteAsync(sql, new { id, isCompleted });
        }
    }
}

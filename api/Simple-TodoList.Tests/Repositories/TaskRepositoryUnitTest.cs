using Microsoft.Extensions.Configuration;
using Simple_TodoList.Dependency.Repositories;
using Simple_TodoList.Extensions;
using Simple_TodoList.Models;
using Simple_TodoList.Repositories;
using Simple_TodoList.Repositories.SQLRepositories;
using Simple_TodoList.Repositories.XMLRepositories;
using Simple_TodoList.Services.XMLStorage;

namespace Simple_TodoList.Tests.Repositories
{
    [TestClass]
    public class TasksRepositoryUnitTest
    {
        [TestMethod]
        public async Task TestSQLTasksRepository()
        {
            var sqlTasksRepository = new TasksRepository(GetConfiguration());
            await TestTasksRepository(sqlTasksRepository);
        }

        [TestMethod]
        public async Task TestXMLTasksRepository()
        {
            var xmlTasksRepository = new XMLTasksRepository(new XMLStorage(GetConfiguration()));
            await TestTasksRepository(xmlTasksRepository);
        }

        private IConfiguration GetConfiguration()
        {
            var builder = new ConfigurationBuilder();
            builder.AddJsonFile("./appsettings.json");

            return builder.Build();
        }
        
        public async Task TestTasksRepository(ITasksRepository tasksRepository)
        {
            // create new task, and check, whether it added or not.
            var task = new TaskModel()
            {
                Name = $"Created task {Guid.NewGuid()}",
                IsCompleted = true
            };

            var insertedTask = await tasksRepository.Insert(task);
            Assert.AreEqual(task.Name, insertedTask.Name);

            // try to update it
            var updatedTask = new TaskModel()
            {
                Name = $"Updated task {Guid.NewGuid()}",
            };

            await tasksRepository.Update(insertedTask.Id, updatedTask);

            var foundedTask = await tasksRepository.GetById(insertedTask.Id);
            Assert.IsNotNull(foundedTask);
            Assert.AreEqual(updatedTask.Name, foundedTask.Name);

            // delete
            await tasksRepository.Delete(insertedTask.Id);

            var resultAfterDeletion = await tasksRepository.GetById(insertedTask.Id);
            Assert.IsNull(resultAfterDeletion);
        }
    }
}

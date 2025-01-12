using Microsoft.Extensions.Configuration;
using Simple_TodoList.Models;
using Simple_TodoList.Repositories.SQLRepositories;
using Simple_TodoList.Repositories.XMLRepositories;
using Simple_TodoList.Repositories;
using Simple_TodoList.Services.XMLStorage;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Simple_TodoList.Tests.Repositories
{
    [TestClass]
    public class CategoriesRepositoryUnitTest
    {
        [TestMethod]
        public async Task TestSQLCategoriesRepository()
        {
            var categoriesRepository = new CategoriesRepository(GetConfiguration());
            await TestCategoriesRepository(categoriesRepository);
        }

        [TestMethod]
        public async Task TestXMLTasksRepository()
        {
            var xmlCategoriesRepository = new XMLCategoriesRepository(new XMLStorage(GetConfiguration()));
            await TestCategoriesRepository(xmlCategoriesRepository);
        }

        private IConfiguration GetConfiguration()
        {
            var builder = new ConfigurationBuilder();
            builder.AddJsonFile("./appsettings.json");

            return builder.Build();
        }

        public async Task TestCategoriesRepository(ICategoriesRepository categoriesRepository)
        {
            // create new category, and check, whether it added or not.
            var category = new CategoryModel()
            {
                Name = $"Created category {Guid.NewGuid()}",
            };

            var insertedCategory = await categoriesRepository.Insert(category);
            Assert.AreEqual(category.Name, insertedCategory.Name);

            // try to update it
            var updatedCategory = new CategoryModel()
            {
                Name = $"Updated category {Guid.NewGuid()}",
            };

            await categoriesRepository.Update(insertedCategory.Id, updatedCategory);

            var foundedCategory = await categoriesRepository.GetById(insertedCategory.Id);
            Assert.IsNotNull(foundedCategory);
            Assert.AreEqual(updatedCategory.Name, foundedCategory.Name);

            // delete
            await categoriesRepository.Delete(insertedCategory.Id);

            var resultAfterDeletion = await categoriesRepository.GetById(insertedCategory.Id);
            Assert.IsNull(resultAfterDeletion);
        }
    }
}

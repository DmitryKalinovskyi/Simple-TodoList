using Microsoft.AspNetCore.Mvc;
using Simple_TodoList.Dependency.Repositories.RepositoryResolvers;
using Simple_TodoList.Models;
using Simple_TodoList.Repositories;
using Simple_TodoList.Repositories.SQLRepositories;
using Simple_TodoList.Services.Storage;
using Simple_TodoList.ViewModels;
using System.Diagnostics;

namespace Simple_TodoList.Controllers
{
    public class HomeController
        (ITasksRepository tasksRepository,
        ICategoriesRepository categoriesRepository,
        SessionStorageTypeSwitcher storageTypeSwitcher) : Controller
    {
        public async Task<IActionResult> Index()
        {
            var viewModel = new IndexViewModel
            {
                Tasks = [.. await tasksRepository.GetAllWithStandartOrdering()],
                Categories = [.. await categoriesRepository.GetAll()],
                StorageType = storageTypeSwitcher.StorageType
            };

            return View(viewModel);
        }

        [HttpPost]
        public async Task<IActionResult> AddTask(CreateTaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                var mappedTask = new TaskModel()
                {
                    Name = task.Name,
                    CategoryId = task.CategoryId,
                    Deadline = task.Deadline
                };

                await tasksRepository.Insert(mappedTask);
            }

            return RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<IActionResult> RemoveTask(int id)
        {
            await tasksRepository.Delete(id);

            return RedirectToAction("Index");   
        }

        [HttpPost]
        public async Task<IActionResult> UpdateTaskComplition(int id, bool isCompleted)
        {
            await tasksRepository.UpdateComplition(id, isCompleted);

            return RedirectToAction("Index");
        }

        [HttpPost]
        public IActionResult ChangeStorageType(StorageType storageType)
        {
            storageTypeSwitcher.SwitchStorageType(storageType);

            return RedirectToAction("Index");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

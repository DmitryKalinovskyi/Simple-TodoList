using Microsoft.AspNetCore.Mvc;
using Simple_TodoList.Factories;
using Simple_TodoList.Models;
using Simple_TodoList.Repositories;
using Simple_TodoList.Repositories.SQLRepositories;
using Simple_TodoList.ViewModels;
using System.Diagnostics;

namespace Simple_TodoList.Controllers
{
    public class HomeController
        (ITasksRepository tasksRepository, ICategoriesRepository categoriesRepository, IRepositoryResolver repositoryResolver) : Controller
    {
        public async Task<IActionResult> Index()
        {
            var viewModel = new IndexViewModel
            {
                Tasks = [.. await tasksRepository.GetAllWithStandartOrdering()],
                Categories = [.. await categoriesRepository.GetAll()],
                StorageType = repositoryResolver.GetStorageType()
            };

            return View(viewModel);
        }

        [HttpPost]
        public async Task<IActionResult> AddTask(TaskModel task)
        {
            await repositoryResolver.GetTasksRepository().Insert(task);

            return RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<IActionResult> RemoveTask(int id)
        {
            await repositoryResolver.GetTasksRepository().Delete(id);

            return RedirectToAction("Index");   
        }

        [HttpPost]
        public async Task<IActionResult> UpdateTaskComplition(int id, bool isCompleted)
        {
            await repositoryResolver.GetTasksRepository().UpdateComplition(id, isCompleted);

            return RedirectToAction("Index");
        }

        [HttpPost]
        public IActionResult ChangeStorageType(StorageType storageType)
        {
            repositoryResolver.SetStorageType(storageType);

            return RedirectToAction("Index");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

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
        (RepositoryResolver repositoryResolver) : Controller
    {
        private readonly RepositoryResolver _repositories = repositoryResolver;

        public async Task<IActionResult> Index()
        {
            var tasksRepository = _repositories.GetTasksRepository();
            var categoriesRepository = _repositories.GetCategoriesRepository();

            var viewModel = new IndexViewModel
            {
                Tasks = [..await tasksRepository.GetAllWithStandartOrdering()],
                Categories = [..await categoriesRepository.GetAll()]
            };

            return View(viewModel);
        }

        [HttpPost]
        public async Task<IActionResult> AddTask(TaskModel task)
        {
            await _repositories.GetTasksRepository().Insert(task);

            return RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<IActionResult> RemoveTask(int id)
        {
            await _repositories.GetTasksRepository().Delete(id);

            return RedirectToAction("Index");   
        }

        [HttpPost]
        public async Task<IActionResult> UpdateTaskComplition(int id, bool isCompleted)
        {
            await _repositories.GetTasksRepository().UpdateComplition(id, isCompleted);

            return RedirectToAction("Index");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Simple_TodoList.Models;
using Simple_TodoList.Repository;
using Simple_TodoList.Repository.SQL;
using Simple_TodoList.ViewModels;
using System.Diagnostics;

namespace Simple_TodoList.Controllers
{
    public class HomeController
        (TaskRepository taskResository,
        CategoriesRepository categoriesRepository) : Controller
    {
        private readonly ITaskResository _taskRepository = taskResository;
        private readonly ICategoriesRepository _categoriesRepository = categoriesRepository;

        public async Task<IActionResult> Index()
        {
            var viewModel = new IndexViewModel
            {
                Tasks = (await _taskRepository.GetAllWithStandartOrdering()).ToList(),
                Categories = (await _categoriesRepository.GetAll()).ToList()
            };

            return View(viewModel);
        }

        [HttpPost]
        public async Task<IActionResult> AddTask(TaskModel task)
        {
            await _taskRepository.Insert(task);

            return RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<IActionResult> RemoveTask(int id)
        {
            await _taskRepository.Delete(id);

            return RedirectToAction("Index");   
        }

        [HttpPost]
        public async Task<IActionResult> UpdateTaskComplition(int id, bool isCompleted)
        {
            await _taskRepository.UpdateComplition(id, isCompleted);

            return RedirectToAction("Index");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

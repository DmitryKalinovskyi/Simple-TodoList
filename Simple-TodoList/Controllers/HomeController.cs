using Microsoft.AspNetCore.Mvc;
using Simple_TodoList.Models;
using Simple_TodoList.Repository;
using Simple_TodoList.ViewModels;
using System.Diagnostics;

namespace Simple_TodoList.Controllers
{
    public class HomeController
        (ITaskResository taskResository,
        ICategoriesRepository categoriesRepository) : Controller
    {
        private ITaskResository _taskRepository = taskResository;
        private ICategoriesRepository _categoriesRepository = categoriesRepository;

        public async Task<IActionResult> Index()
        {
            var viewModel = new IndexViewModel();

            viewModel.Tasks = await _taskRepository.GetAllWithStandartOrdering();
            viewModel.Categories = await _categoriesRepository.GetAll();

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
        public async Task<IActionResult> UpdateTaskComplition(int id, [FromForm] string isCompleted)
        {
            bool ok = isCompleted == "on";

            await _taskRepository.UpdateComplition(id, ok);

            return RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<IActionResult> UpdateTaskName(int id, [FromForm] string name)
        {
            await _taskRepository.UpdateName(id, name);

            return RedirectToAction("Index");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

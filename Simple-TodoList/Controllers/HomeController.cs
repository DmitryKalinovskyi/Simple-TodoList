using Microsoft.AspNetCore.Mvc;
using Simple_TodoList.Models;
using Simple_TodoList.Repository;
using Simple_TodoList.ViewModels;
using System.Diagnostics;

namespace Simple_TodoList.Controllers
{
    public class HomeController(ITaskResository taskResository) : Controller
    {
        private ITaskResository _taskRepository = taskResository;

        public async Task<IActionResult> Index()
        {
            var viewModel = new IndexViewModel();

            viewModel.Tasks = await _taskRepository.GetAll();

            return View(viewModel);
        }

        [HttpPost]
        public IActionResult AddTask(TaskModel task)
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Simple_TodoList.Models;
using Simple_TodoList.ViewModels;
using System.Diagnostics;

namespace Simple_TodoList.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            var viewModel = new IndexViewModel();

            viewModel.Tasks = [
                new Models.TaskModel
                {
                    Id = 1,
                    Name = "Task 1"
                },
                new Models.TaskModel
                {
                    Id = 2,
                    Name = "Task 2"
                },

                ];



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

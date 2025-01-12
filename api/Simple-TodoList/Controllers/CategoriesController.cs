using Microsoft.AspNetCore.Mvc;
using Simple_TodoList.Factories.RepositoryResolvers;
using Simple_TodoList.Models;
using Simple_TodoList.Repositories;
using Simple_TodoList.ViewModels;

namespace Simple_TodoList.Controllers
{
    public class CategoriesController(ICategoriesRepository categoriesRepository) : Controller
    {
        public async Task<IActionResult> Index()
        {
            var viewModel = new CategoriesViewModel
            {
                Categories = [..await categoriesRepository.GetAll()]
            };

            return View(viewModel);
        }

        [HttpPost]
        public async Task<IActionResult> AddCategory(string categoryName)
        {
            await categoriesRepository.Insert(new CategoryModel { Name = categoryName });

            return RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<IActionResult> RemoveCategory(int id)
        {
            await categoriesRepository.Delete(id);

            return RedirectToAction("Index");
        }
    }
}

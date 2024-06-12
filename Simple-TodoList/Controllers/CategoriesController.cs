﻿using Microsoft.AspNetCore.Mvc;
using Simple_TodoList.Factories;
using Simple_TodoList.Models;
using Simple_TodoList.ViewModels;

namespace Simple_TodoList.Controllers
{
    public class CategoriesController(IRepositoryResolver repositoryResolver) : Controller
    {
        public async Task<IActionResult> Index()
        {
            var categoriesRepository = repositoryResolver.GetCategoriesRepository();

            var viewModel = new CategoriesViewModel
            {
                Categories = [..await categoriesRepository.GetAll()]
            };

            return View(viewModel);
        }

        [HttpPost]
        public async Task<IActionResult> AddCategory(string categoryName)
        {
            var categories = repositoryResolver.GetCategoriesRepository();

            await categories.Insert(new CategoryModel { Name = categoryName });

            return RedirectToAction("Index");
        }

        [HttpPost]
        public async Task<IActionResult> RemoveCategory(int id)
        {
            var categories = repositoryResolver.GetCategoriesRepository();

            await categories.Delete(id);

            return RedirectToAction("Index");
        }
    }
}
using Simple_TodoList.Factories;
using Simple_TodoList.Repositories.SQLRepositories;
using Simple_TodoList.Repositories.XMLRepositories;
using Simple_TodoList.Services.XMLStorage;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Add task repositories
builder.Services
    .AddSingleton<TasksRepository>()
    .AddSingleton<XMLTasksRepository>();

// Add categories repositories
builder.Services
    .AddSingleton<CategoriesRepository>()
    .AddSingleton<XMLCategoriesRepository>();

builder.Services.AddSingleton<SQLRepositoryFactory>();
builder.Services.AddSingleton<XMLRepositoryFactory>();
builder.Services.AddSingleton<IXMLStorage, XMLStorage>();
builder.Services.AddSingleton<RepositoryResolver>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/as/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

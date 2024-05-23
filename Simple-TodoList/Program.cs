using Simple_TodoList.Factories;
using Simple_TodoList.Repository.SQL;
using Simple_TodoList.Repository.XML;
using Simple_TodoList.Services.XMLStorage;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Add task repositories
builder.Services
    .AddScoped<TasksRepository>()
    .AddScoped<XMLTasksRepository>();

// Add categories repositories
builder.Services
    .AddScoped<CategoriesRepository>()
    .AddScoped<XMLCategoriesRepository>();


builder.Services.AddScoped<SQLRepositoryFactory>();
builder.Services.AddScoped<XMLRepositoryFactory>();
builder.Services.AddScoped<RepositoryResolver>();
builder.Services.AddScoped<IXMLStorage, XMLStorage>();

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

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

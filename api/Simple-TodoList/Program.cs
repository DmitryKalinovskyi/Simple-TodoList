using Simple_TodoList.Dependency.Repositories;
using Simple_TodoList.Extensions;
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

builder.Services.AddDistributedMemoryCache();

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromSeconds(10);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

builder.Services.AddHttpContextAccessor();

builder.Services.AddRepositoryResolvers();

builder.Services.AddGraphQLServices();

var app = builder.Build();
app.UseCors((policyBuilder) =>
{
    policyBuilder.AllowAnyHeader();
    policyBuilder.AllowAnyMethod();
    policyBuilder.AllowAnyOrigin();
});

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/as/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseGraphQLAltair();
app.UseGraphQL();

app.UseSession();

app.UseRouting();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

using GraphQL;
using GraphQL.SystemTextJson;
using GraphQL.Types;
using Microsoft.Extensions.Configuration;
using Simple_TodoList.Extensions;
using Simple_TodoList.Factories;
using Simple_TodoList.GraphQL.Queries;
using Simple_TodoList.GraphQL.Schema;
using Simple_TodoList.GraphQL.Settings;
using Simple_TodoList.GraphQL.Types;
using Simple_TodoList.Repositories;
using Simple_TodoList.Repositories.SQLRepositories;
using Simple_TodoList.Repositories.XMLRepositories;
using Simple_TodoList.Services.XMLStorage;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

builder.Services.AddTransient<CategoryType>();
builder.Services.AddTransient<TaskType>();
builder.Services.AddTransient<TaskQuery>();
builder.Services.AddTransient<ISchema, TaskSchema>();

builder.Services.AddGraphQL(b => b
    .AddAutoSchema<ISchema>()
    .AddSystemTextJson()
    );

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    //app.UseSwagger();
    //app.UseSwaggerUI();
    app.UseGraphQLAltair();
}

app.UseHttpsRedirection();

app.UseGraphQL();

app.UseAuthorization();


app.MapControllers();

app.Run();


//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.
//builder.Services.AddControllersWithViews();

//// Add task repositories
//builder.Services
//    .AddSingleton<TasksRepository>()
//    .AddSingleton<XMLTasksRepository>();

//// Add categories repositories
//builder.Services
//    .AddSingleton<CategoriesRepository>()
//    .AddSingleton<XMLCategoriesRepository>();

//builder.Services.AddSingleton<SQLRepositoryFactory>();
//builder.Services.AddSingleton<XMLRepositoryFactory>();
//builder.Services.AddSingleton<IXMLStorage, XMLStorage>();

//builder.Services.AddDistributedMemoryCache();

//builder.Services.AddSession(options =>
//{
//    options.IdleTimeout = TimeSpan.FromSeconds(10);
//    options.Cookie.HttpOnly = true;
//    options.Cookie.IsEssential = true;
//});

//builder.Services.AddHttpContextAccessor();

//builder.Services.AddScoped<IRepositoryResolver, SessionBasedRepositoryResolver>();
//builder.Services.AddRepositoryResolvers();

////builder.Services.AddGraphQLServices();
//builder.Services.AddTransient<TaskType>();
//builder.Services.AddTransient<CategoryType>();
//builder.Services.AddTransient<TaskQuery>();
//builder.Services.AddTransient<ISchema, TaskSchema>();

//builder.Services.AddGraphQL(b => b
//    .AddAutoSchema<ISchema>()
//    .AddSystemTextJson());

//var app = builder.Build();


//// Configure the HTTP request pipeline.
//if (!app.Environment.IsDevelopment())
//{
//    app.UseExceptionHandler("/as/Error");
//    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
//    app.UseHsts();
//}

//app.UseHttpsRedirection();
//app.UseStaticFiles();

////app.UseGraphQLAltair();
//app.UseGraphQLGraphiQL();
//app.UseGraphQL();

//app.UseSession();

//app.UseRouting();

//app.MapControllerRoute(
//    name: "default",
//    pattern: "{controller=Home}/{action=Index}/{id?}");

//app.Run();

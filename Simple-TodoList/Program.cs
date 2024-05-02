using Simple_TodoList.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();


// Initialize repositories
{
    string? connectionString = builder.Configuration.GetConnectionString("TodoDB");

    if (connectionString == null) throw new ArgumentNullException(nameof(connectionString));

    // Add task repository to the di container
    builder.Services.AddSingleton<ITaskResository>(
        provider => new TaskRepository(connectionString));

    // Add categories repository to the di container
    builder.Services.AddSingleton<ICategoriesRepository>(
        provider => new CategoriesRepository(connectionString));
}

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

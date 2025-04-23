using System;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
//var serverVersion = new MySqlServerVersion(new Version(8, 0, 23));

//builder.Services.AddDbContext<AppDbContext>(options =>
//options.UseMySql(connectionString, serverVersion)
//.LogTo(Console.WriteLine, LogLevel.Information)
//.EnableSensitiveDataLogging()
//.EnableDetailedErrors());
//builder.Services.AddScoped<IContatoRepository, ContatoRepository>();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();

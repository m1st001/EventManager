using EventManager.WebApi.Core;
using EventManager.WebApi.Data;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme);
builder.Services.AddAuthorization();

// Registering custom services
builder.Services.AddAllScoped();
builder.Services.AddIdentity();
builder.Services.ConfigureCookies();
builder.Services.AddMinio();

builder.AddNpgsqlDbContext<AppDbContext>(connectionName: "postgresDb", options =>
{
    options.CommandTimeout = 300;
});

var app = builder.Build();

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.UseCors(static builder => 
    builder.AllowAnyMethod()
        .AllowAnyHeader()
        .AllowAnyOrigin());

app.MapEndpoints();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.Run();
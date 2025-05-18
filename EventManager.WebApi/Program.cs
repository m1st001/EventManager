using EventManager.WebApi.Core;
using EventManager.WebApi.Data;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowMyFrontend",
        policyBuilder =>
        {
            policyBuilder.WithOrigins(builder.Configuration["FrontendUrl"]!)
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme);
builder.Services.AddAuthorization();

// Registering custom services
builder.Services.AddAllScoped();
builder.Services.AddIdentity();
builder.Services.ConfigureCookies();
builder.Services.AddMinio();

builder.ConfigureOtLogging();

builder.AddNpgsqlDbContext<AppDbContext>(connectionName: "postgresDb", options =>
{
    options.CommandTimeout = 300;
});

var app = builder.Build();

app.UseCors("AllowMyFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapEndpoints();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.Run();
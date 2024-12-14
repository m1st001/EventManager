using EventManager.WebApi.Data;
using EventManager.WebApi.Data.Models;
using EventManager.WebApi.Endpoints;
using EventManager.WebApi.Services;
using EventManager.WebApi.Services.Abstractions;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;

namespace EventManager.WebApi.Core;

public static class DiExtensions
{
    /// <summary>
    /// Add identity
    /// </summary>
    public static IServiceCollection AddIdentity(this IServiceCollection services)
    {
        services.AddIdentity<User, IdentityRole<int>>()
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders();

        return services;
    }

    /// <summary>
    /// Add all scoped services
    /// </summary>
    public static IServiceCollection AddAllScoped(this IServiceCollection services)
    {
        services.AddScoped<IEventService, EventService>();
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<ISubscribeService, SubscribeService>();
        services.AddScoped<IAuthenticationService, AuthenticationService>();

        return services;
    }

    /// <summary>
    /// Configure cookies
    /// </summary>
    public static IServiceCollection ConfigureCookies(this IServiceCollection services)
    {
        services.ConfigureApplicationCookie(options =>
        {
            options.Cookie.HttpOnly = true;
            options.ExpireTimeSpan = TimeSpan.FromDays(15); //todo TimeSpan need add to config
            options.ReturnUrlParameter = CookieAuthenticationDefaults.ReturnUrlParameter;
            options.SlidingExpiration = true;
        });
        services.Configure<DataProtectionTokenProviderOptions>(opt =>
            opt.TokenLifespan = TimeSpan.FromMinutes(30)); //todo TimeSpan need add to config

        return services;
    }

    /// <summary>
    /// Add all endpoints
    /// </summary>
    public static WebApplication MapEndpoints(this WebApplication app)
    {
        app.RegisterEventEndpoints();
        app.RegisterIdentityEndpoints();

        return app;
    }
}
using Amazon.Runtime;
using Amazon.S3;
using EventManager.WebApi.Data;
using EventManager.WebApi.Data.Models;
using EventManager.WebApi.Endpoints;
using EventManager.WebApi.Services;
using EventManager.WebApi.Services.Abstractions;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using OpenTelemetry.Exporter;
using OpenTelemetry.Logs;

namespace EventManager.WebApi.Core;

public static class DiExtensions
{
    /// <summary>
    /// Add identity.
    /// </summary>
    public static IServiceCollection AddIdentity(this IServiceCollection services)
    {
        services.AddIdentity<User, IdentityRole<int>>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 6;
                options.Password.RequiredUniqueChars = 0;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
                
            })
            .AddEntityFrameworkStores<AppDbContext>()
            .AddDefaultTokenProviders();

        // Configure cookie settings
        services.ConfigureApplicationCookie(options =>
        {
            options.Cookie.HttpOnly = true;
            options.Cookie.SecurePolicy = CookieSecurePolicy.Always; // Use Always in production
            options.Cookie.SameSite = SameSiteMode.Strict;
            options.ExpireTimeSpan = TimeSpan.FromMinutes(30);
            options.SlidingExpiration = true;
        });
        
        return services;
    }

    public static WebApplicationBuilder ConfigureOtLogging(this WebApplicationBuilder builder)
    {
        builder.Logging.ClearProviders();
        builder.Logging.AddOpenTelemetry(options => options.AddOtlpExporter(x =>
            {
                x.Endpoint = new Uri("http://localhost:5341/ingest/otlp/v1/logs");
                x.Protocol = OtlpExportProtocol.HttpProtobuf;
            }
        ));
        builder.Logging.AddFilter("Microsoft.EntityFrameworkCore.Database.Command", LogLevel.Warning);
        
        return builder;
    }

    /// <summary>
    /// Add all scoped services.
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
    /// Configure cookies.
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
    /// Add all endpoints.
    /// </summary>
    public static WebApplication MapEndpoints(this WebApplication app)
    {
        app.RegisterEventEndpoints();
        app.RegisterIdentityEndpoints();
        app.RegisterSubscribeEndpoints();
        app.RegisterUserEndpoints();

        return app;
    }

    public static IServiceCollection AddMinio(this IServiceCollection services)
    {
        services.AddSingleton<IAmazonS3>(_ => new AmazonS3Client(
            new BasicAWSCredentials("minioadmin", "minioadmin"), // Default MinIO credentials
            new AmazonS3Config
            {
                ServiceURL = "http://minio:9000", // Matches the Aspire service name
                ForcePathStyle = true, // Required for MinIO
                UseHttp = true // Disable HTTPS in dev
            }
        ));

        return services;
    }
}
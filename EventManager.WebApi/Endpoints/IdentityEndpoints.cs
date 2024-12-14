using EventManager.WebApi.Data.Models.Requests.Auth;
using EventManager.WebApi.Services.Abstractions;

namespace EventManager.WebApi.Endpoints;

public static class IdentityEndpoints
{
    /// <summary>
    /// Identity endpoints
    /// </summary>
    public static void RegisterIdentityEndpoints(this WebApplication app)
    {
        var auth = app.MapGroup("authentication").WithOpenApi();
        auth.MapPost("login",
            async (IAuthenticationService authenticationService, LoginRequest request, bool rememberMe) =>
                await authenticationService.Login(request.Username, request.Password, rememberMe)); // Login user

        auth.MapPost("register",
            async (IAuthenticationService authenticationService, RegisterRequest request) =>
                await authenticationService.Register(request.Username, request.Email, request.Password)); // Register user
        
        auth.MapPost("logout", async (IAuthenticationService authenticationService) =>
            await authenticationService.Logout()); // Logout user
    }
}
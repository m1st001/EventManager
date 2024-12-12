using EventManager.WebApi.Data.Models.Requests;
using EventManager.WebApi.Services.Abstractions;

namespace EventManager.WebApi.Endpoints;

public static class IdentityEndpoints
{
    public static void RegisterIdentityEndpoints(this WebApplication app)
    {
        var auth = app.MapGroup("authentication").WithOpenApi();

        auth.MapPost("login",
            async (IAuthenticationService authenticationService, LoginRequest request, bool rememberMe) =>
                await authenticationService.Login(request.Username, request.Password, rememberMe));

        auth.MapPost("register",
            async (IAuthenticationService authenticationService, RegisterRequest request) =>
                await authenticationService.Register(request.Username, request.Email, request.Password));
        
        auth.MapPost("logout", async (IAuthenticationService authenticationService) =>
            await authenticationService.Logout());
    }
}
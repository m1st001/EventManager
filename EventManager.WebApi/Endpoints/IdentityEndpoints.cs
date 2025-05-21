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
        var auth = app.MapGroup("authentication").WithOpenApi().WithTags("Identity");

        auth.MapPost("login",
            async (IAuthenticationService authenticationService, LoginRequest request, bool rememberMe) =>
            {
                var user = await authenticationService.Login(request.Username, request.Password, rememberMe); // Login user
                return user is not null
                    ? TypedResults.Ok(user)
                    : Results.BadRequest("Username or password is incorrect");
            });

        auth.MapPost("register", async (IAuthenticationService authenticationService, RegisterRequest request) =>
        {
            var user = await authenticationService.Register(request.Username, request.Email, request.Password); // Register user

            return user is not null
                ? TypedResults.Ok(user)
                : Results.BadRequest("User is already registered");
        });

        auth.MapPost("logout", async (IAuthenticationService authenticationService) =>
        {
            await authenticationService.Logout();
            return TypedResults.Ok("Successfully logged out");
        });

        auth.MapGet("me", async (HttpContext context,IAuthenticationService authenticationService) =>
        {
            var result = await authenticationService.GetMe(context.User);
            return result is not null ? TypedResults.Ok(result) : Results.Unauthorized();
        }).RequireAuthorization();
    }
}
using EventManager.WebApi.Services.Abstractions;

namespace EventManager.WebApi.Endpoints;

public static class UserEndpoints
{
    public static void RegisterUserEndpoints(this WebApplication app)
    {
        var users = app.MapGroup("/users").WithOpenApi().WithTags("Users");
        
        users.MapGet("/{id:int}", async (int id, IUserService userService)
            => TypedResults.Ok(await userService.GetUserByIdAsync(id)));
        
        users.MapGet("/{name}", async (string name, IUserService userService)
            => TypedResults.Ok(await userService.GetUserByNameAsync(name)));
    }
}
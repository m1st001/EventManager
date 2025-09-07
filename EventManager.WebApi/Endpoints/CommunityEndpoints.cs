using EventManager.WebApi.Data.Models;
using EventManager.WebApi.Data.Models.Requests.Communities;
using EventManager.WebApi.Services.Abstractions;

namespace EventManager.WebApi.Endpoints;

public static class CommunityEndpoints
{
    public static void RegisterCommunityEndpoints(this WebApplication app)
    {
        var communities = app.MapGroup("/communities").WithOpenApi().WithTags("Communities");

        communities.MapGet("/", async (ICommunityService service) =>
            TypedResults.Ok(await service.GetAllAsync()));

        communities.MapGet("/{id:int}", async (int id, ICommunityService service) =>
        {
            var result = await service.GetByIdAsync(id);
            return result is not null ? TypedResults.Ok(result) : Results.NoContent();
        });

        communities.MapPost("/", async (ICommunityService service, CreateCommunityRequest request) =>
        {
            var id = await service.CreateAsync(request);
            return id != -1 ? TypedResults.Created() : Results.Conflict();
        }).RequireAuthorization();

        communities.MapPut("/{id:int}", async (int id, ICommunityService service, CreateCommunityRequest request) =>
        {
            var result = await service.UpdateAsync(id, request);
            return result is not null ? TypedResults.Ok(result) : Results.Conflict();
        }).RequireAuthorization();

        communities.MapDelete("/{id:int}", async (int id, ICommunityService service) =>
            await service.DeleteAsync(id) ? TypedResults.Ok(id) : Results.NoContent()).RequireAuthorization();
    }
}
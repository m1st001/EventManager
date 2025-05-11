using EventManager.WebApi.Data.Models.Requests.Subscribe;
using EventManager.WebApi.Services.Abstractions;

namespace EventManager.WebApi.Endpoints;

public static class SubscribeEndpoints
{
    public static void RegisterSubscribeEndpoints(this WebApplication app)
    {
        var subGroup = app.MapGroup("/sub").WithDisplayName("Subscriptions").WithDescription("Endpoints for managing event subscriptions.");
        subGroup.MapPost("/subscribe", async (ISubscribeService subscribeService, SubscribeEventRequest request) =>
            await subscribeService.SubscribeAsync(request.UserId, request.EventId) ? Results.Ok() : Results.BadRequest())
            .WithTags("Subscriptions");
        
        subGroup.MapPost("/unsubscribe", async (ISubscribeService subscribeService, SubscribeEventRequest request) =>
            await subscribeService.UnsubscribeAsync(request.UserId, request.EventId) ? Results.Ok() : Results.BadRequest())
            .WithTags("Subscriptions");
    }
}
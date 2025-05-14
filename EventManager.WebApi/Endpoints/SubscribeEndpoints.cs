using EventManager.WebApi.Data.Models.Requests.Subscribe;
using EventManager.WebApi.Services.Abstractions;

namespace EventManager.WebApi.Endpoints;

public static class SubscribeEndpoints
{
    public static void RegisterSubscribeEndpoints(this WebApplication app)
    {
        var subGroup = app.MapGroup("/sub").WithDisplayName("Subscriptions").WithDescription("Endpoints for managing event subscriptions.");
        
        subGroup.MapPost("/subscribe", async (ISubscriptionService subscriptionService, SubscribeEventRequest request) =>
            await subscriptionService.SubscribeAsync(request.UserId, request.EventId) ? Results.Ok() : Results.BadRequest())
            .WithTags("Subscriptions");
        
        subGroup.MapPost("/unsubscribe", async (ISubscriptionService subscriptionService, SubscribeEventRequest request) =>
            await subscriptionService.UnsubscribeAsync(request.UserId, request.EventId) ? Results.Ok() : Results.BadRequest())
            .WithTags("Subscriptions");
    }
}
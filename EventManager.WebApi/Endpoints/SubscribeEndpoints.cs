using EventManager.WebApi.Data.Models.Requests.Subscribe;
using EventManager.WebApi.Services.Abstractions;

namespace EventManager.WebApi.Endpoints;

public static class SubscribeEndpoints
{
    public static void RegisterSubscribeEndpoints(this WebApplication app)
    {
        app.MapPost("/subscribe", (ISubscribeService eventService, SubscribeEventRequest request) =>
        {
            eventService.SubscribeAsync(request.UserId, request.EventId);
        });
        
        app.MapPost("/unsubscribe", (ISubscribeService eventService, SubscribeEventRequest request) =>
        {
            eventService.SubscribeAsync(request.UserId, request.EventId);
        });
    }
}
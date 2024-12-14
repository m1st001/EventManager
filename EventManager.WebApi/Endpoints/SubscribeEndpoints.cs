using EventManager.WebApi.Data.Models.Requests.Subscribe;
using EventManager.WebApi.Services.Abstractions;

namespace EventManager.WebApi.Endpoints;

public static class SubscribeEndpoints
{
    public static void RegisterSubscribeEndpoints(this WebApplication app)
    {
        app.MapPost("/subscribe", (ISubscribeService eventService, SubscribeEventRequest request) =>
        {
            throw new NotImplementedException();
        });
        
        app.MapPost("/unsubscribe", (ISubscribeService eventService, SubscribeEventRequest request) =>
        {
            throw new NotImplementedException();
        });
    }
}
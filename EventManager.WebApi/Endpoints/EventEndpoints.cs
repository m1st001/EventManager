using EventManager.WebApi.Data;
using EventManager.WebApi.Data.Models;
using EventManager.WebApi.Services.Abstractions;

namespace EventManager.WebApi.Endpoints;

public static class EventEndpoints
{
    public static void RegisterEventEndpoints(this WebApplication app)
    {
        var events = app.MapGroup("/events").WithOpenApi();
        
        events.MapGet("/", async (IEventService eventService)
            => TypedResults.Ok(await eventService.GetAllEventsAsync()));
        
        events.MapGet("/{id:int}", async (int id, IEventService eventService)
            => await eventService.GetEventByIdAsync(id));
    }
}
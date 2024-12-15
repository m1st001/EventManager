using EventManager.WebApi.Data.Models.Requests.Events;
using EventManager.WebApi.Services.Abstractions;

namespace EventManager.WebApi.Endpoints;

public static class EventEndpoints
{
    public static void RegisterEventEndpoints(this WebApplication app)
    {
        var events = app.MapGroup("/events").WithOpenApi();
        
        events.MapGet("/", async (IEventService eventService)
            => TypedResults.Ok(await eventService.GetAllEventsAsync()));
        
        events.MapGet("/{id:int}", async (int id, IEventService eventService) =>
        {
            var result = await eventService.GetEventByIdAsync(id);
            return result is not null
                ? TypedResults.Ok(result)
                : Results.NoContent();
        });

        events.MapPost("/", async (IEventService eventService, CreateEventRequest request) =>
        {
            var id = await eventService.AddEventAsync(request);
            return id != -1
                ? TypedResults.Created()
                : Results.Conflict();
        });

        events.MapPut("/{id:int}", async (int id, IEventService eventService, CreateEventRequest request) =>
        {
            var result = await eventService.UpdateEventAsync(id, request);
            return result is not null
                ? TypedResults.Ok(result)
                : Results.Conflict();
        });

        events.MapDelete("/{id:int}", async (int id, IEventService eventService) =>
            await eventService.DeleteEventAsync(id) ? TypedResults.Ok(id) : Results.NoContent());
    }
}
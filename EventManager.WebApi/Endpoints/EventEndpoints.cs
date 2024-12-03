using EventManager.WebApi.Data;
using EventManager.WebApi.Data.Models;

namespace EventManager.WebApi.Endpoints;

public static class EventEndpoints
{
    public static void RegisterEventEndpoints(this WebApplication app)
    {
        app.MapGet("/events/1", GetAllEvents);
    }
    
    static async Task<IResult> GetAllEvents(AppDbContext db)
    {
        return TypedResults.Ok(new Event
        {
            Id = 1,
            EventName = "Event1",
        });
    }
}
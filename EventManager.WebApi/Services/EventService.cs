using EventManager.WebApi.Data;
using EventManager.WebApi.Data.Models;
using EventManager.WebApi.Data.Models.Requests.Events;
using EventManager.WebApi.Services.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace EventManager.WebApi.Services;

public class EventService(AppDbContext context) : IEventService
{
    public async Task<List<Event>> GetAllEventsAsync()
    {
        return await context.Events.ToListAsync();
    }

    public async Task<Event?> GetEventByIdAsync(int id)
    {
        return await context.Events.FindAsync(id);
    }

    public async Task<int> AddEventAsync(CreateEventRequest request)
    {
        var created = context.Events.Add(new Event(request));
        await context.SaveChangesAsync();
        return created.Entity is not null ? created.Entity.Id : -1;
    }

    public async Task<Event?> UpdateEventAsync(int id, CreateEventRequest request)
    {
        var updated = context.Events.Update(new Event(request));
        await context.SaveChangesAsync();
        return updated.Entity is not null ? updated.Entity : null;
    }

    public async Task<bool> DeleteEventAsync(int id)
    {
        var eventToDelete = await context.Events.FindAsync(id);
        if (eventToDelete is null)
        {
            return false;
        }

        context.Events.Remove(eventToDelete);
        await context.SaveChangesAsync();
        return true;
    }
}
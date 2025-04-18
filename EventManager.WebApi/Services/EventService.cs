using EventManager.WebApi.Data;
using EventManager.WebApi.Data.Models;
using EventManager.WebApi.Data.Models.Requests.Events;
using EventManager.WebApi.Services.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace EventManager.WebApi.Services;

public class EventService(AppDbContext context, ILogger<EventService> logger) : IEventService
{
    private readonly ILogger _logger = logger;
    public async Task<List<Event>> GetAllEventsAsync()
    {
        _logger.LogInformation("GetAllEvents was successfully completed");
        return await context.Events.ToListAsync();
    }

    public async Task<List<Event>> GetAllRegisteredEventsAsync(int userId)
    {
        _logger.LogInformation("GetAllRegisteredEvents was successfully completed");
        var user = await context.Users.FindAsync(userId);
        return user == null ? [] : context.Events.Where(e => e.Participants.Contains(user)).ToList();
    }

    public async Task<Event?> GetEventByIdAsync(int id)
    {
        _logger.LogInformation("GetEventById was successfully completed");
        return await context.Events.FindAsync(id);
    }

    public async Task<int> AddEventAsync(CreateEventRequest request)
    {
        var created = context.Events.Add(new Event(request));
        await context.SaveChangesAsync();
        
        _logger.LogInformation("AddEventAsync was successfully completed");
        
        return created.Entity is not null ? created.Entity.Id : -1;
    }

    public async Task<Event?> UpdateEventAsync(int id, CreateEventRequest request)
    {
        var updated = context.Events.Update(new Event(request));
        await context.SaveChangesAsync();
        
        _logger.LogInformation("UpdateEvent was successfully completed");
        
        return updated.Entity is not null ? updated.Entity : null;
    }

    public async Task<bool> DeleteEventAsync(int id)
    {
        var eventToDelete = await context.Events.FindAsync(id);
        if (eventToDelete is null)
        {
            _logger.LogError("{event} not found", eventToDelete);
            return false;
        }

        context.Events.Remove(eventToDelete);
        await context.SaveChangesAsync();
        
        _logger.LogInformation("DeleteEvent was successfully completed");
        
        return true;
    }
}
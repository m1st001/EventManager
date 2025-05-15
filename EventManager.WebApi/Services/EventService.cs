using EventManager.WebApi.Data;
using EventManager.WebApi.Data.Models;
using EventManager.WebApi.Data.Models.Abstractions;
using EventManager.WebApi.Data.Models.Requests.Events;
using EventManager.WebApi.Services.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace EventManager.WebApi.Services;

public class EventService(AppDbContext context, ILogger<EventService> logger) : IEventService
{
    private readonly ILogger _logger = logger;
    public async Task<List<IEvent>> GetAllEventsAsync()
    {
        _logger.LogInformation("GetAllEvents was successfully completed");
        return await context.Events.ToListAsync<IEvent>();
    }

    public async Task<List<IEvent>> GetAllEventsByStatus(EventStatus status)
    {
        _logger.LogInformation("Fetched all events with {status} status", status);
        return await context.Events.Where(e => e.Status == status).ToListAsync<IEvent>();
    }

    public async Task<List<IEvent>> GetAllEventsByAvailability(EventAvailability availability)
    {
        _logger.LogInformation("Fetched all events with {availability} availability", availability);
        return await context.Events.Where(e => e.Availability == availability).ToListAsync<IEvent>();
    }

    public async Task<List<IEvent>> GetAllRegisteredEventsAsync(int userId)
    {
        _logger.LogInformation("GetAllRegisteredEvents was successfully completed");
        var user = await context.Users.FindAsync(userId);
        return user == null ? [] : context.Events.Where(e => e.Participants.Contains(user)).ToList<IEvent>();
    }

    public async Task<IEvent?> GetEventByIdAsync(int id)
    {
        _logger.LogInformation("GetEventById was successfully completed");
        return await context.Events.FindAsync(id);
    }

    public async Task<int> AddEventAsync(CreateEventRequest request)
    {
        var created = context.Events.Add(new Event(request));
        await context.SaveChangesAsync();
        
        _logger.LogInformation("Event {id} was successfully created.", created.Entity.Id);
        
        return created.Entity is not null ? created.Entity.Id : -1;
    }

    public async Task<IEvent?> UpdateEventAsync(int id, CreateEventRequest request)
    {
        var updated = context.Events.Update(new Event(request));
        await context.SaveChangesAsync();
        
        _logger.LogInformation("Event {id} was edited.", id);
        return updated.Entity;
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
        
        _logger.LogInformation("Event {id} was successfully deleted.", id);
        
        return true;
    }

    public async Task<List<IEventQuickInfo>> GetEventsHistoryByUserIdAsync(int userId, int count)
    {
        _logger.LogInformation("Successfully fetched Event history for user {userId}", userId);
        throw new NotImplementedException();
    }

    public async Task<List<IEventQuickInfo>> GetEventsRegistrationsByUserIdAsync(int userId, int count = 5)
    {
        throw new NotImplementedException();
    }
}
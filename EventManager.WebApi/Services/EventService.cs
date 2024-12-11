using EventManager.WebApi.Data;
using EventManager.WebApi.Data.Models;
using EventManager.WebApi.Data.Models.Abstractions;
using EventManager.WebApi.Services.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace EventManager.WebApi.Services;

public class EventService(AppDbContext context) : IEventService
{
    public async Task<List<Event>> GetAllEventsAsync()
    {
        return await context.Events.ToListAsync();
    }

    public async Task<Event> GetEventByIdAsync(int id)
    {
        return await context.Events.FindAsync(id);
    }

    public Task AddEventAsync(User user)
    {
        throw new NotImplementedException();
    }

    public Task UpdateEventAsync(User user)
    {
        throw new NotImplementedException();
    }

    public Task DeleteEventAsync(int id)
    {
        throw new NotImplementedException();
    }
}
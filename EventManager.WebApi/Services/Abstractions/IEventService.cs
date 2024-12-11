using EventManager.WebApi.Data.Models;
using EventManager.WebApi.Data.Models.Abstractions;

namespace EventManager.WebApi.Services.Abstractions;

/// <summary>
/// Service for interacting with Events.
/// </summary>
public interface IEventService
{
    Task<List<Event>> GetAllEventsAsync();
    Task<Event> GetEventByIdAsync(int id); 
    Task AddEventAsync(User user); 
    Task UpdateEventAsync(User user);
    Task DeleteEventAsync(int id);
}
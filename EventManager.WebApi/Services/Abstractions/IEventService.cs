using EventManager.WebApi.Data.Models;
using EventManager.WebApi.Data.Models.Requests.Events;

namespace EventManager.WebApi.Services.Abstractions;

/// <summary>
/// Service for interacting with Events DBSet.
/// </summary>
public interface IEventService
{
    /// <summary>
    /// Get list of all events.
    /// </summary>
    /// <returns>All events in the database.</returns>
    Task<List<Event>> GetAllEventsAsync();
    /// <summary>
    /// Get an event by id.
    /// </summary>
    /// <param name="id">Event.Id</param>
    /// <returns>Event instance, null if not found.</returns>
    Task<Event?> GetEventByIdAsync(int id);

    /// <summary>
    /// Create a new event.
    /// </summary>
    /// <param name="request">Request</param>
    /// <returns>id of newly created event.</returns>
    Task<int> AddEventAsync(CreateEventRequest request); 
    Task UpdateEventAsync(Event @event);
    Task DeleteEventAsync(int id);
}
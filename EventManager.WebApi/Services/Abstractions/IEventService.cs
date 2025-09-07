using EventManager.WebApi.Data.Models.Abstractions;
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
    Task<List<IEvent>> GetAllEventsAsync();
    
    /// <summary>
    /// Gets all events with the specified status.
    /// </summary>
    /// <param name="status"><see cref="EventStatus"/></param>
    /// <returns></returns>
    Task<List<IEvent>> GetAllEventsByStatus(EventStatus status);
    
    /// <summary>
    /// Gets all events by availability.
    /// </summary>
    /// <param name="availability"><see cref="EventAvailability"/></param>
    /// <returns></returns>
    Task<List<IEvent>> GetAllEventsByAvailability(EventAvailability availability);
    
    /// <summary>
    /// Get an event by id.
    /// </summary>
    /// <param name="id">Event.Id</param>
    /// <returns>Event instance, null if not found.</returns>
    Task<IEvent?> GetEventByIdAsync(int id);
    
    /// <summary>
    /// Gets all events userId:user is registered to.
    /// </summary>
    /// <param name="userId"></param>
    /// <returns></returns>
    Task<List<IEvent>> GetAllRegisteredEventsAsync(int userId);

    /// <summary>
    /// Create a new event.
    /// </summary>
    /// <param name="request">Request</param>
    /// <returns>id of newly created event.</returns>
    Task<int> AddEventAsync(CreateEventRequest request); 
    
    /// <summary>
    /// Update an existing event.
    /// </summary>
    /// <param name="id"></param>
    /// <param name="request"></param>
    /// <returns>Updated event entity.</returns>
    Task<IEvent?> UpdateEventAsync(int id, CreateEventRequest request);
    
    /// <summary>
    /// Delete an event.
    /// </summary>
    /// <param name="id">id of event to delete.</param>
    /// <returns>true if deleted successfully.</returns>
    Task<bool> DeleteEventAsync(int id);
    
    /// <summary>
    /// Gets last n:count events user:userId has participated in.
    /// </summary>
    /// <param name="userId">User.Id</param>
    /// <param name="count">Count of events to get</param>
    /// <returns></returns>
    Task<List<IEvent>> GetEventsHistoryByUserIdAsync(int userId, int count = 5);
}
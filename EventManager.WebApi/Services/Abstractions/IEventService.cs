using EventManager.WebApi.Data.Models.Abstractions;

namespace EventManager.WebApi.Services.Abstractions;

/// <summary>
/// Service for interacting with Events.
/// </summary>
public interface IEventService
{
     /// <summary>
     /// Add a new event.
     /// </summary>
     public void AddEvent(IEvent newEvent);
     
     /// <summary>
     /// Remove an event.
     /// </summary>
     public void RemoveEvent(int eventId);
     
     /// <summary>
     /// Update an event.
     /// </summary>
     public void UpdateEvent();
     
     /// <summary>
     /// Get all events.
     /// </summary>
     public void GetAllEvents();
     
     /// <summary>
     /// Get an event by id.
     /// </summary>
     /// <param name="eventId"></param>
     public void GetEventById(int eventId);

     /// <summary>
     /// Get all events of specific author.
     /// </summary>
     /// <param name="userId"></param>
     public void GetEventsByAuthor(int userId);
}
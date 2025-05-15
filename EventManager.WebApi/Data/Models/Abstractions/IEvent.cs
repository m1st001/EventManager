namespace EventManager.WebApi.Data.Models.Abstractions;

/// <summary>
/// Interface for an Event entity.
/// </summary>
public interface IEvent
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public string[] Tags { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime CreatedDate { get; }
    public EventStatus Status { get; }
    public EventAvailability Availability { get; }
    public ICollection<User> Participants { get; set; }
    public int MaxParticipants { get; set; }
    public int CreatorId { get; set; }
}

/// <summary>
/// 
/// </summary>
public interface ISubscribable
{
    /// <summary>
    /// Subscribe user to an event.
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>True if successfully subscribed, false otherwise.</returns>
    public bool Subscribe(int userId);
    /// <summary>
    /// Unsubscribe user from an event.
    /// </summary>
    /// <param name="userId"></param>
    /// <returns>True if successfully unsubscribed, false otherwise.</returns>
    public bool Unsubscribe(int userId);
}

/// <summary>
/// Represents <see cref="Event"/> status.
/// </summary>
public enum EventStatus
{
    /// <summary>
    /// Event is planned.
    /// </summary>
    Planned = 0,
    /// <summary>
    /// Event was completed.
    /// </summary>
    Completed = 1,
    /// <summary>
    /// Event was cancelled.
    /// </summary>
    Cancelled = 2,
}

/// <summary>
/// Represents if <see cref="Event"/> needs more participants.
/// </summary>
public enum EventAvailability
{
    Available = 0,
    Reserved = 1,
}
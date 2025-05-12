namespace EventManager.WebApi.Services.Abstractions;

/// <summary>
/// Service for working with user's subscriptions to events.
/// </summary>
public interface ISubscriptionService
{
    /// <summary>
    /// Subscribes user to an event.
    /// </summary>
    /// <param name="userId">User id.</param>
    /// <param name="eventId">Event id.</param>
    /// <returns>True if subscribed successfully.</returns>
    Task<bool> SubscribeAsync(int userId,int eventId);
    /// <summary>
    /// Unsubscribes user from an event.
    /// </summary>
    /// <param name="userId">User id.</param>
    /// <param name="eventId">Event id.</param>
    /// <returns>True if unsubscribed successfully.</returns>
    Task<bool> UnsubscribeAsync(int userId,int eventId);
    /// <summary>
    /// Checks if user is subscribed to an event.
    /// </summary>
    /// <param name="userId">User id.</param>
    /// <param name="eventId">Event id.</param>
    /// <returns></returns>
    Task<bool> IsSubscribed(int userId, int eventId);
}
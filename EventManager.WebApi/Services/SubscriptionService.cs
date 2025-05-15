using EventManager.WebApi.Data;
using EventManager.WebApi.Services.Abstractions;
using Microsoft.EntityFrameworkCore;

namespace EventManager.WebApi.Services;

public class SubscriptionService(AppDbContext context, ILogger<SubscriptionService> logger) : ISubscriptionService
{
    private readonly ILogger _logger = logger;
    public async Task<bool> SubscribeAsync(int userId, int eventId)
    {
        var user = await context.Users.Include(u => u.SubscribedToEvents)
            .FirstOrDefaultAsync(u => u.Id == userId);
        var @event = await context.Events.FindAsync(eventId);
        
        if (user is null || @event is null)
        {
            _logger.LogError("{user} or {event} not found", user, eventId);
            return false;
        }
        
        if (user.SubscribedToEvents.Any(e => e.Id == eventId))
        {
            return true;
        }
        
        user.SubscribedToEvents.Add(@event);
        await context.SaveChangesAsync();
        
        _logger.LogInformation("User {user} has successfully subscribed to the event: {event}", userId, eventId);
        return true;
    }

    public async Task<bool> UnsubscribeAsync(int userId, int eventId)
    {
       var user = await context.Users.FindAsync(userId);
       var @event = await context.Events.FindAsync(eventId);
       
       if (user is null)
       {
           _logger.LogError("User id:{user} not found", user);
           return false;
       }
       
       if (@event is null)
       {
           _logger.LogError("Event id:{event} not found", eventId);
           return false;
       }
       
       user.SubscribedToEvents.Remove(@event);
       await context.SaveChangesAsync();
       
       _logger.LogInformation("Successfully unsubscribed user {user} from event {event}", userId, eventId);
       return true;
    }

    public async Task<bool> IsSubscribed(int userId, int eventId)
    {
        return await context.Users
            .Where(u => u.Id == userId)
            .SelectMany(u => u.SubscribedToEvents)
            .AnyAsync(e => e.Id == eventId);
    }
}
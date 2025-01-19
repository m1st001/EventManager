using EventManager.WebApi.Data;
using EventManager.WebApi.Services.Abstractions;

namespace EventManager.WebApi.Services;

public class SubscribeService(AppDbContext context, ILogger<SubscribeService> logger) : ISubscribeService
{
    private readonly ILogger _logger = logger;
    public async Task<bool> SubscribeAsync(int userId, int eventId)
    {
        var user = await context.Users.FindAsync(userId);
        var @event = await context.Events.FindAsync(eventId);
        
        if (user is null || @event is null)
        {
            _logger.LogError("{user} or {event} not found", user, eventId);
            return false;
        }
        
        @event.Participants.Add(user);
        await context.SaveChangesAsync();
        
        _logger.LogInformation("Successfully subscribed to the event: {event}", eventId);
        return true;
    }

    public async Task<bool> UnsubscribeAsync(int userId, int eventId)
    {
       var user = await context.Users.FindAsync(userId);
       var @event = await context.Events.FindAsync(eventId);
       
       if (user is null || @event is null)
       {
           _logger.LogError("{user} or {event} not found", user, eventId);
           return false;
       }
       
       @event.Participants.Remove(user);
       await context.SaveChangesAsync();
       
       _logger.LogInformation("Successfully unsubscribed to the event: {event}", eventId);
       return true;
    }
}
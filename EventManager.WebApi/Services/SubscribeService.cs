using EventManager.WebApi.Data;
using EventManager.WebApi.Services.Abstractions;

namespace EventManager.WebApi.Services;

public class SubscribeService(AppDbContext context) : ISubscribeService
{
    public async Task<bool> SubscribeAsync(int userId, int eventId)
    {
        var user = await context.Users.FindAsync(userId);
        var @event = await context.Events.FindAsync(eventId);
        
        if (user is null || @event is null)
        {
            return false;
        }
        
        @event.Participants.Add(user);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> UnsubscribeAsync(int userId, int eventId)
    {
       var user = await context.Users.FindAsync(userId);
       var @event = await context.Events.FindAsync(eventId);
       
       if (user is null || @event is null)
       {
           return false;
       }
       
       @event.Participants.Remove(user);
       await context.SaveChangesAsync();
       return false;
    }
}
using EventManager.WebApi.Data;
using EventManager.WebApi.Services.Abstractions;

namespace EventManager.WebApi.Services;

public class SubscribeService(AppDbContext context) : ISubscribeService
{
    public async Task SubscribeAsync(int userId, int eventId)
    {
        await context.SaveChangesAsync();
    }

    public async Task UnsubscribeAsync(int userId, int eventId)
    {
       await context.SaveChangesAsync();
    }
}
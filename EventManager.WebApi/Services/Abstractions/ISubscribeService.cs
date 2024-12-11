namespace EventManager.WebApi.Services.Abstractions;

public interface ISubscribeService
{
    Task SubscribeAsync(int userId,int eventId);
    Task UnsubscribeAsync(int userId,int eventId);
}
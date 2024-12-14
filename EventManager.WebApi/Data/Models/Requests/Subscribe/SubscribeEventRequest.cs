namespace EventManager.WebApi.Data.Models.Requests.Subscribe;

public record SubscribeEventRequest
{
    public int UserId { get; set; }
    
    public int EventId { get; set; }
};
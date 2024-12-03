using EventManager.WebApi.Data.Models.Abstractions;

namespace EventManager.WebApi.Data.Models;

public class Event: IEvent
{
    public int Id { get; set; }
    public string? EventName { get; set; }
}
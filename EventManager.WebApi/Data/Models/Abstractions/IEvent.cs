namespace EventManager.WebApi.Data.Models.Abstractions;

/// <summary>
/// Interface for an Event entity.
/// </summary>
public interface IEvent
{
    public int Id { get; set; }
    public string? EventName { get; set; }
}
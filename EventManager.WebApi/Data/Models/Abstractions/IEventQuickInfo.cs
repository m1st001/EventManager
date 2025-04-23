namespace EventManager.WebApi.Data.Models.Abstractions;

/// <summary>
/// Minimal representation of an Event entity.
/// </summary>
public interface IEventQuickInfo
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string[] Tags { get; set; }
    public DateTime StartDate { get; set; }
}
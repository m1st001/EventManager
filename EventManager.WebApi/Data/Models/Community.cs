using System.ComponentModel.DataAnnotations;

namespace EventManager.WebApi.Data.Models;

public class Community
{
    public int Id { get; set; }
    [MinLength(3)]
    [MaxLength(40)]
    public required string Name { get; set; }
    [MaxLength(200)]
    public string? Description { get; set; }
    public DateTime CreatedDate { get; } = DateTime.UtcNow;
    public int CreatorId { get; set; }

    // Navigation
    public ICollection<User> Members { get; set; } = new List<User>();
    public ICollection<Event> Events { get; set; } = new List<Event>();
}
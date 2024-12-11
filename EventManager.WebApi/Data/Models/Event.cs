using System.ComponentModel.DataAnnotations;
using EventManager.WebApi.Data.Models.Abstractions;

namespace EventManager.WebApi.Data.Models;

public class Event
{
    public int Id { get; set; }
    
    [MinLength(3)]
    [MaxLength(20)]
    public required string Name { get; set; }

    [Required]
    public DateTime StartDate { get; set; }
    
    [Required]
    public DateTime CreatedDate { get; } = DateTime.UtcNow;
    
    public ICollection<User> Participants { get; set; } = new List<User>();
    
    public int CreatorId { get; set; }
    
    public string[] Tags { get; set; }
}
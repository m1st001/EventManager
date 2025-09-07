using System.ComponentModel.DataAnnotations;

namespace EventManager.WebApi.Data.Models.Requests.Communities;

public record CreateCommunityRequest
{
    [MinLength(3)]
    [MaxLength(40)]
    public required string Name { get; set; }

    [MaxLength(200)]
    public string? Description { get; set; }

    [Required]
    public int CreatorId { get; set; }
}
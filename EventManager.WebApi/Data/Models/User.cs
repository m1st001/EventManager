using EventManager.WebApi.Data.Models.Abstractions;
using Microsoft.AspNetCore.Identity;

namespace EventManager.WebApi.Data.Models;

/// <summary>
/// Class representing the User entity.
/// </summary>
public class User : IdentityUser<int>, IUser
{
    public ICollection<Event> Events { get; set; } = new List<Event>();
    public ICollection<Community> Communities { get; set; } = new List<Community>();
}
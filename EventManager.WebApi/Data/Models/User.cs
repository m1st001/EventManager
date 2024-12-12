using EventManager.WebApi.Data.Models.Abstractions;
using Microsoft.AspNetCore.Identity;

namespace EventManager.WebApi.Data.Models;

/// <summary>
/// Class representing the User entity.
/// </summary>
public class User : IdentityUser<int>, IUser
{
    public ICollection<Event> SubscribedToEvents { get; set; } = new List<Event>();
    
    public ICollection<Event> ParticipatedInEvents { get; set; } = new List<Event>();
}
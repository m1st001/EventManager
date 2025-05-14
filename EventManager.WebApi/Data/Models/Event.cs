using System.ComponentModel.DataAnnotations;
using EventManager.WebApi.Data.Models.Abstractions;
using EventManager.WebApi.Data.Models.Requests.Events;

namespace EventManager.WebApi.Data.Models;

public class Event() : IEvent, IEventQuickInfo, ISubscribable
{
    public Event(CreateEventRequest request) : this()
    {
        Name = request.Name;
        Description = request.Description;
        CreatorId = request.CreatorId;
        StartDate = request.StartDate;
        CreatorId = request.CreatorId;
        MaxParticipants = request.MaxParticipants;
        Tags = request.Tags;
    }

    public int Id { get; set; }
    [MinLength(3)] [MaxLength(20)] public string Name { get; set; }
    [MaxLength(80)] public string Description { get; set; }
    [Required] public DateTime StartDate { get; set; }
    [Required] public DateTime CreatedDate { get; } = DateTime.UtcNow;
    public ICollection<User> Participants { get; set; } = new List<User>();
    public int MaxParticipants { get; set; }
    public int CreatorId { get; set; }
    public string[] Tags { get; set; }
    public EventStatus Status { get; set; }
    public EventAvailability Availability =>
        Participants.Count < MaxParticipants ? EventAvailability.Available : EventAvailability.Reserved;
    
    public bool Subscribe(int userId)
    {
        throw new NotImplementedException();
    }

    public bool Unsubscribe(int userId)
    {
        throw new NotImplementedException();
    }
}
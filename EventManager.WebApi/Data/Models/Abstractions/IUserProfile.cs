namespace EventManager.WebApi.Data.Models.Abstractions;

/// <summary>
/// Interface of a User's profile.
/// </summary>
public interface IUserProfile
{
    /// <summary>
    /// User.Id
    /// </summary>
    public int Id { get; set; }
    
    /// <summary>
    /// User.Name
    /// </summary>
    public string Name { get; set; }
    
    /// <summary>
    /// Last events user has participated in.
    /// </summary>
    public IEventQuickInfo[] EventsHistory { get; set; }
    
    /// <summary>
    /// Events user is registered in.
    /// </summary>
    public IEventQuickInfo[] RegisteredIn { get; set; }
}